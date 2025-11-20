'use server';

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment, updateCartTotalAmount } from '@/shared/lib';
import { getUserSession } from '@/shared/lib/get-user-session';
import { hashSync } from 'bcrypt';

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      throw new Error('Пользователь уже существует');
    }

    await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
        verified: new Date(), // Автоматически верифицируем пользователя
      },
    });
  } catch (error) {
    console.log('Error [CREATE_USER]', error);
    throw error;
  }
}

export async function createOrder(data: CheckoutFormValues) {
    try {
      const cookieStore = cookies();
      const cartToken = (await cookieStore).get('cartToken')?.value;

      if(!cartToken) {
        throw new Error('Cart token not found')
      }

      // Находим корзину по токену
      const userCart = await prisma.cart.findFirst({
        include: {
          user: true,
          items: {
            include: {
              ingredients: true,
              productItem: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
        where: {
          token: cartToken,
        },
      });

      // Принудительно обновляем totalAmount перед проверкой
      if(userCart) {
        await updateCartTotalAmount(cartToken);
        // Получаем обновленную корзину
        const updatedCart = await prisma.cart.findFirst({
          include: {
            user: true,
            items: {
              include: {
                ingredients: true,
                productItem: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
          where: {
            token: cartToken,
          },
        });
        
        // Используем обновленную корзину
        Object.assign(userCart, updatedCart);
      }

      // Если корзина не найдена - ошибка
      if(!userCart) {
        throw new Error('Cart not found');
      }

      // Проверяем есть ли товары в корзине
      const hasItems = userCart.items && userCart.items.length > 0;
      
      // Если корзина пустая или нет товаров - ошибка
      if(!hasItems || userCart?.totalAmount === 0) {
        console.log('Cart debug:', {
          hasItems,
          totalAmount: userCart?.totalAmount,
          itemsCount: userCart?.items?.length,
          items: userCart?.items
        });
        throw new Error('Cart is empty');
      }

      // Создаём заказ
      const order = await prisma.order.create({
        data: {
          token: cartToken,
          fullName: data.firstName + ' ' + data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          comment: data.comment,
          totalAmount: userCart.totalAmount,
          status: OrderStatus.PENDING,
          items: JSON.stringify(userCart.items),
        },
      });

      // Очищаем totalAmount корзины
      await prisma.cart.update({
        where: {
          id: userCart.id,
        },
        data: {
          totalAmount: 0,
        },
      });

      await prisma.cartItem.deleteMany({
        where: {
          cartId: userCart.id,
        },
      });

      //  создание ссылки оплаты
      const paymentData = await createPayment({
        amount: order.totalAmount,
        description: 'Оплата заказа #' + order.id,
        orderId: order.id,
      });

      if(!paymentData) {
        throw new Error('Payment data not found');
      }

      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          paymentId: paymentData.id,
        }
      });

      const paymentUrl = paymentData.confirmation.confirmation_url;

      return paymentUrl;
    } catch (err) {
      console.log('{CreateOrder} Server error', err);
      throw err; // Пробрасываем ошибку дальше
    }
}

export async function updateUserInfo(body: Prisma.UserCreateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      }
    })

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (error) {
    console.log('Error [UPDATE_USER]', error);
    throw error;
  }
}


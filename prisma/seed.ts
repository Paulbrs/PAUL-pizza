import { Prisma } from "@prisma/client";
import { categories, ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from 'bcrypt';

const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({ 
    productId,
    pizzaType,
    size, 
}: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40; 
}) => {
    // Если указаны размеры — это пицца. Для пицц ограничиваем цены 20–40.
    // Распределим по диапазонам в зависимости от размера:
    // 20 см → 20–25, 30 см → 26–35, 40 см → 36–40
    let price: number;
    if (size) {
        if (size === 20) {
            price = Math.round(randomNumber(20, 25));
        } else if (size === 30) {
            price = Math.round(randomNumber(26, 35));
        } else {
            price = Math.round(randomNumber(36, 40));
        }
    } else {
        // Прочие категории (завтрак, закуски, коктейли, напитки): 7–15
        price = Math.round(randomNumber(7, 15));
    }

    return {
        productId,
        price,
        pizzaType,
        size,
    } as Prisma.ProductItemUncheckedCreateInput;
}

async function up() {    
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User Test',
                email: 'user@test.ru',
                password: hashSync('11111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin Admin',
                email: 'admin@test.ru',
                password: hashSync('11111', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ],
    }); // создание некольких пользователей

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.ingredient.createMany({
        data: ingredients,
    });
    
    await prisma.product.createMany({
        data: products,
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Пепперони фрэш',
            imageUrl: '/pizza1.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Сырная',
            imageUrl: '/pizza2.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Чоризо фрэш ',
            imageUrl:
            'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40),
            },
        },
    });

    await prisma.productItem.createMany({
        data: [
            // Пицца "Пепперони фреш"
            generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

            // Пицца "Сырная"
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

            // Пицца "Чоризо фреш"
            generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

            // Остальные продукты
            generateProductItem({ productId: 1 }),
            generateProductItem({ productId: 2 }),
            generateProductItem({ productId: 3 }),
            generateProductItem({ productId: 4 }),
            generateProductItem({ productId: 5 }),
            generateProductItem({ productId: 6 }),
            generateProductItem({ productId: 7 }),
            generateProductItem({ productId: 8 }),
            generateProductItem({ productId: 9 }),
            generateProductItem({ productId: 10 }),
            generateProductItem({ productId: 11 }),
            generateProductItem({ productId: 12 }),
            generateProductItem({ productId: 13 }),
            generateProductItem({ productId: 14 }),
            generateProductItem({ productId: 15 }),
            generateProductItem({ productId: 16 }),
            generateProductItem({ productId: 17 }),
        ],
    }); // генерация

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: "11111",
            },
            {
                userId: 2,
                totalAmount: 0,
                token: "22222",
            },
        ],
    });

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{id: 1}, {id: 2}, {id: 3}, {id: 4}],
            },
        },
    });

    await prisma.story.createMany({
        data: [
          {
            previewImageUrl:
              'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
          },
          {
            previewImageUrl:
              'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
          },
          {
            previewImageUrl:
              'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
          },
          {
            previewImageUrl:
              'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
          },
          {
            previewImageUrl:
              'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
          },
          {
            previewImageUrl:
              'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
          },
        ],
      });
    
    await prisma.storyItem.createMany({
        data: [
          {
            storyId: 1,
            sourceUrl:
              'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
          },
          {
            storyId: 1,
            sourceUrl:
              'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
          },
          {
            storyId: 1,
            sourceUrl:
              'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
          },
          {
            storyId: 1,
            sourceUrl:
              'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
          },
          {
            storyId: 1,
            sourceUrl:
              'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
          },
          // StoryId 2 - Узнали себя
            {
                storyId: 2,
                sourceUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600'
            },
            // StoryId 3 - Подборка специально для вас
            {
                storyId: 3,
                sourceUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600'
            },
            // StoryId 4 - Факт месяца
            {
                storyId: 4,
                sourceUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'
            },
            // StoryId 5 - Кофе со вкусом
            {
                storyId: 5,
                sourceUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600'
            },
            // StoryId 6 - Без мяса
            {
                storyId: 6,
                sourceUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600'
            }
        ],
    });
} 

async function down() {
    await prisma.storyItem.deleteMany({});
    await prisma.story.deleteMany({});
    await prisma.productItem.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.ingredient.deleteMany({});
    await prisma.cartItem.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.verificationCode.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.user.deleteMany({});
}// очищение

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
  .then(async () => {
    await prisma.$disconnect();
})
  .catch(async(e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
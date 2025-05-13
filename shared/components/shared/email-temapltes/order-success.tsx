import * as React from 'react';
import Image from 'next/image';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';

interface Props {
  orderId: number;
  items: CartItemDTO[]; 
}

export const OrderSuccessTemplate: React.FC<Props> = ({
    orderId, items,
}) => (
  <div>
    <h1>
        Спасибо за покупку! 
        <Image src='/public/success.png' alt='Успешно выполнено' /> 
    </h1>
  
    <p> Ваш заказ №{orderId} оплачен. Список товаров: </p> 
  
    <hr />

    <ul>
        {items.map((item) => (
            <li key={item.id}>
                {item.productItem.product.name} | {item.productItem.price} Br * {item.quantity} шт = {' '}
                {item.productItem.price * item.quantity} Br
            </li>  
        ))}
    </ul>

  </div>
);
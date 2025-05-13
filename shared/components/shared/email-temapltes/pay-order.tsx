import * as React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
    orderId, totalAmount, paymentUrl
}) => (
  <div>
    <h1>Заказ #{orderId}!</h1>
  
    <p>
       Оплатите заказ на сумму <b>{totalAmount} Br</b>. 
       Перейдите <a href={paymentUrl}>по ссылке</a> для оплаты Вашего заказа
    </p> 
  </div>
);
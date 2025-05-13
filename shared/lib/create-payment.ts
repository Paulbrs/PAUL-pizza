import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

interface Props {
  description: string;
  orderId: number;
  amount: number; 
}

export async function createPayment(details: Props) {
  const storeId = process.env.YOOKASSA_STORE_ID;
const apiKey = process.env.YOOKASSA_API_KEY;

if (!storeId || !apiKey) {
  if (!process.env.YOOKASSA_STORE_ID || !process.env.YOOKASSA_API_KEY) {
    throw new Error('YooKassa store ID и API ключ не установлены в переменных окружения');
  } else {
    throw new Error('YooKassa store ID и API ключ не установлены');
  }
}

  try {
    console.log('Store ID:', process.env.YOOKASSA_STORE_ID);
    console.log('API Key:', process.env.YOOKASSA_API_KEY);
    const { data } = await axios.post<PaymentData>(
      'https://api.yookassa.ru/v3/payments',
      {
        amount: {
          value: details.amount,
          currency: 'RUB',
        },
        capture: true,
        description: details.description,
        metadata: {
          order_id: details.orderId,
        },
        confirmation: {
          type: 'redirect',
          return_url: process.env.YOOKASSA_CALLBACK_URL,
        },
      },
      {
        auth: {
          username: process.env.YOOKASSA_STORE_ID as string,
          password: process.env.YOOKASSA_API_KEY as string,
        },
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': Math.random().toString(36).substring(7),
        },
      }
    );
  
    return data;
  }
  catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}
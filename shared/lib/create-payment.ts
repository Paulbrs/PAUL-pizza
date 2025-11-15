import { PaymentData } from "@/@types/yookassa";
import axios from "axios";
import crypto from "crypto";

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
    console.log('Creating payment with:', {
      storeId: process.env.YOOKASSA_STORE_ID,
      apiKeyLength: process.env.YOOKASSA_API_KEY?.length,
      amount: details.amount,
      orderId: details.orderId
    });
    const { data } = await axios.post<PaymentData>(
      'https://api.yookassa.ru/v3/payments',
      {
        amount: {
          value: details.amount.toString(),
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
          'Idempotence-Key': crypto.randomUUID(),
          'Accept': 'application/json',
        },
      }
    );
  
    return data;
  }
  catch (error: any) {
    console.error('Error creating payment:', error);
    
    // Логируем детали ошибки от YooKassa
    if (error.response) {
      console.error('YooKassa error response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.response.config?.url,
        method: error.response.config?.method,
        headers: error.response.config?.headers
      });
    }
    
    throw error;
  }
}
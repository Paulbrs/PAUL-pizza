import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { cn } from '@/shared/lib/utils';


const DELIVERY_PRICE = 250;


interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
  
  const totalPrice =  totalAmount + DELIVERY_PRICE;
  
  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
        <div className="flex flex-col gap-1">
          <span className="text-xl">Итого:</span>
          {loading ? ( 
            <Skeleton className='w-48 h-11'/>
          ) : ( 
            <span className="h-11 text-[34px] font-extrabold">{totalPrice} Br</span>
          )}
        </div>

        <CheckoutItemDetails 
          title={
          <div className="flex items-center"> 
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость товаров:
          </div>  
          }
          value={loading ? <Skeleton className='w-16 h-6 rounded-[6px]'/> : `${totalAmount} Br`}
        />
        <CheckoutItemDetails 
          title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400"/> 
              Доставка: 
          </div> 
          } 
          value={loading ? <Skeleton className='w-16 h-6 rounded-[6px]'/> : `${DELIVERY_PRICE} Br`}
        />


        <Button loading={loading} type='submit' className='w-full h-14 rounded-2xl mt-6 text-base font-bold '>
          Перейти к оплате
          <ArrowRight className='w-5 ml-2'/>
        </Button>
    </WhiteBlock>
  );
};
import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { cn } from '@/shared/lib/utils';


const DELIVERY_PRICE = 3.50;


interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
  
  const totalPrice =  totalAmount + DELIVERY_PRICE;
  
  return (
    <WhiteBlock className={cn("p-4 sm:p-5 lg:p-6 lg:sticky lg:top-4", className)}>
        <div className="flex flex-col gap-1">
          <span className="text-lg sm:text-xl">Итого:</span>
          {loading ? ( 
            <Skeleton className='w-32 sm:w-48 h-8 sm:h-11'/>
          ) : ( 
            <span className="h-8 sm:h-11 text-2xl sm:text-3xl lg:text-[34px] font-extrabold">{totalPrice} Br</span>
          )}
        </div>

        <CheckoutItemDetails 
          title={
          <div className="flex items-center"> 
            <Package size={16} className="sm:size-[18px] mr-2 text-gray-400" />
            <span className="text-sm sm:text-base">Стоимость товаров:</span>
          </div>  
          }
          value={loading ? <Skeleton className='w-12 sm:w-16 h-5 sm:h-6 rounded-[6px]'/> : `${totalAmount} Br`}
        />
        <CheckoutItemDetails 
          title={
          <div className="flex items-center">
            <Truck size={16} className="sm:size-[18px] mr-2 text-gray-400"/> 
            <span className="text-sm sm:text-base">Доставка:</span>
          </div> 
          } 
          value={loading ? <Skeleton className='w-12 sm:w-16 h-5 sm:h-6 rounded-[6px]'/> : `${DELIVERY_PRICE} Br`}
        />


        <Button loading={loading} type='submit' className='w-full h-12 sm:h-14 rounded-2xl mt-4 sm:mt-6 text-sm sm:text-base font-bold '>
          Перейти к оплате
          <ArrowRight className='w-4 sm:w-5 ml-2'/>
        </Button>
    </WhiteBlock>
  );
};
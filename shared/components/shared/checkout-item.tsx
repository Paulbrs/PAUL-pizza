'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';

interface Props extends CartItemProps {
  onClickRemove: () => void;
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div 
     className={cn(
      'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4',
      {
        'opacity-50 pointer-events-none': disabled,
      },
      className
     )}>
      <div className="flex items-center gap-3 sm:gap-5 flex-1 w-full sm:w-auto">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5 w-full sm:w-auto">
        <CartItemDetails.Price value={price} />

        <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
          <div className="min-w-[96px]">
            <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
          </div>
          <button type="button" onClick={onClickRemove}>
            <X className="text-gray-400 cursor-pointer hover:text-gray-600 w-5 h-5 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Ingredient } from '@prisma/client';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, ingredients, className }) => {
  return (
    <div className={cn(className)}>
        <Link href={`/product/${id}`}>
            <div className='flex justify-center p-4 sm:p-5 lg:p-6 bg-secondary rounded-lg h-[200px] sm:h-[220px] lg:h-[260px]'>
                <img className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] lg:w-[215px] lg:h-[215px]" src={imageUrl} alt={name} />
            </div>

            <Title text={name} size='sm' className='mb-1 mt-2 sm:mt-3 font-bold' />
            
            <p className='text-xs sm:text-sm text-gray-400 line-clamp-2'>
              {
                ingredients.map((ingredient) => 
                ingredient.name).join(',')
              }
            </p>

            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mt-3 sm:mt-4'>
                <span className='text-base sm:text-lg lg:text-[20px]'>
                    от <b>{price} Br</b>
                </span>

            <Button variant="secondary" className='text-sm sm:text-base font-bold w-full sm:w-auto'>
                <Plus size={18} className='sm:size-5 mr-1'/>
                    Добавить
            </Button>                
            
            
            </div>
        </Link>
    </div>
  );
};
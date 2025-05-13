'use client'

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { usePizzaOptions } from '@/shared/hooks';
import { getPizzaDetails } from '@/shared/lib';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[]; 
  items: ProductItem[]; 
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}
/**
 * Форма выбора пиццы
 */
export const ChoosePizzaForm: React.FC<Props> = ({ 
    imageUrl,
    name,
    ingredients,
    loading,
    items,
    onSubmit,
    className,
}) => {
    const { size, type, selectedIngredients, availableSizes, currentItemId, setSize, setType, addIngredient } = 
      usePizzaOptions(items);

    const { totalPrice, textDetaills } = getPizzaDetails( type, size, items, ingredients, selectedIngredients );

    const handleClickAdd = () => {
      if(currentItemId) {
        onSubmit(currentItemId, Array.from(selectedIngredients));
      }
    }

    
  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className=' w-[490px] bg-[#f0efef93] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />
        <p className='text-gray-400'>{textDetaills}</p>
        
        <div className='text-flex-col gap-5 mt-5'>
          <GroupVariants 
            items={availableSizes} 
            value={String(size)} 
            onClick={(value) => setSize(Number(value) as PizzaSize)} 
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar'>
          <div className='grid grid-cols-3 gap-3'>
            {ingredients.map((ingredients) => (
              <IngredientItem 
                key={ingredients.id}
                imageUrl={ingredients.imageUrl}
                name={ingredients.name}
                price={ingredients.price}
                onClick={() => addIngredient(ingredients.id)}
                active={selectedIngredients.has(ingredients.id)}
              />
            ))}
          </div>
        </div>

        <Button 
          loading={loading}
          onClick={handleClickAdd} 
          className='h-[55px] px-10 text-base rounded-[18px] w-full mt-[-10px]'>
          Добавить в корзину за {totalPrice} Br
        </Button>
      </div>
  </div>
  ); 
};
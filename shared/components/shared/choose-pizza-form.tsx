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
    <div className={cn(className, 'flex flex-col h-full pb-24 lg:flex-row flex-1')}>
      {/* Изображение пиццы */}
      <div className='flex items-center justify-center p-3 sm:p-4 md:p-5 lg:p-0 lg:flex-1'>
        <PizzaImage imageUrl={imageUrl} size={size} />
      </div>

      {/* Контент */}
      <div className='w-full lg:w-[490px] bg-[#f0efef93] p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col'>
        {/* Название */}
        <Title text={name} size='md' className='font-extrabold mb-2 sm:mb-3' />
        
        {/* Описание - только на мобильных и iPad */}
        <div className='lg:hidden mb-3'>
          <h3 className='font-bold text-gray-800 mb-1.5 text-sm md:text-base'>Описание</h3>
          <p className='text-gray-600 text-xs md:text-sm leading-relaxed'>
            Классическая пицца с пепперони и моцареллой. Острый вкус и аромат итальянской кухни.
          </p>
        </div>

        {/* Детали размера и типа */}
        <p className='text-gray-400 text-sm sm:text-base md:text-base mb-3 lg:mb-0'>{textDetaills}</p>
        
        {/* Варианты размера и типа */}
        <div className='flex flex-col gap-3 sm:gap-4 md:gap-4 mt-3 lg:mt-5'>
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

        {/* Ингредиенты для выбора - скрываем на мобильных и iPad, показываем на десктопе */}
        <div className='hidden lg:block bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5  mb-6'>
          <div className='grid grid-cols-3 gap-3'>
            {ingredients.map((ingredient) => (
              <IngredientItem 
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        {/* Кнопка добавления */}
        <div className='mt-auto pt-3 lg:pt-0 lg:sticky lg:bottom-0 bg-[#f0efef93]'>
          <Button 
            loading={loading}
            onClick={handleClickAdd} 
            className='h-[48px] sm:h-[50px] md:h-[52px] lg:h-[55px] px-6 sm:px-10 text-sm sm:text-base rounded-[18px] w-full'>
            <span className='hidden sm:inline'>Добавить в корзину за </span>
            <span className='sm:hidden'>В корзину за </span>
            {totalPrice} Br
          </Button>
        </div>
      </div>
  </div>
  ); 
};
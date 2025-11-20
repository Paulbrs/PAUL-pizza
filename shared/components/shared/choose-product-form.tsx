import { cn } from '@/shared/lib/utils';
import React from 'react';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  price: number,
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}
/**
 * Форма выбора продукта
 */
export const ChooseProductForm: React.FC<Props> = ({ 
    imageUrl,
    name,
    price,
    loading,
    onSubmit,
    className,
}) => {
  return (
  <div className={cn(className, 'flex flex-col lg:flex-row flex-1')}>
    {/* Изображение продукта */}
    <div className='flex items-center justify-center flex-1 relative w-full p-4 sm:p-6 md:p-8 lg:p-0'>
        <img
          src={imageUrl}
          alt={name}
          className='relative left-2 top-2 transition-all z-10 duration-300 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] mx-auto'
        />
    </div>

    {/* Контент */}
    <div className='w-full lg:w-[490px] bg-[#f0efef93] p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col'>
      <Title text={name} size='md' className='font-extrabold mb-2 lg:mb-1' />

      {/* Цена - только на мобильных и iPad */}
      <div className='lg:hidden mb-4'>
        <p className='text-2xl font-bold text-gray-800'>
          {price} Br
        </p>
      </div>

      {/* Кнопка добавления */}
      <div className='mt-auto pt-4 lg:pt-0 lg:mt-10'>
        <Button 
          loading={loading}
          onClick={() => onSubmit?.()} 
          className='h-[48px] sm:h-[50px] md:h-[52px] lg:h-[55px] px-6 sm:px-10 text-sm sm:text-base rounded-[18px] w-full'>
          <span className='hidden sm:inline'>Добавить в корзину за </span>
          <span className='sm:hidden'>В корзину за </span>
          {price} Br
        </Button>
      </div>
    </div>
  </div>
  ); 
};
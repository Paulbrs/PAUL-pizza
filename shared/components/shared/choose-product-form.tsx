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
  <div className={cn(className, 'flex min-h-0 flex-1 flex-col lg:min-h-[500px] lg:flex-row')}>
    {/* Изображение продукта */}
    <div className='relative flex w-full flex-1 items-center justify-center p-4 sm:p-6 md:p-8 lg:min-w-0 lg:p-0'>
        <img
          src={imageUrl}
          alt={name}
          className='relative left-2 top-2 z-10 mx-auto h-[200px] w-[200px] transition-all duration-300 sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px] lg:h-[320px] lg:w-[320px] xl:h-[350px] xl:w-[350px]'
        />
    </div>

    {/* Контент */}
    <div className='flex w-full flex-col bg-[#f0efef93] p-4 sm:p-5 md:p-6 lg:w-[440px] lg:p-6 xl:w-[490px] xl:p-7'>
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
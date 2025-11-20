import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40;
}

export const PizzaImage: React.FC<Props> = ({ imageUrl, size,  className }) => {
  return (
    <div className={cn('flex items-center justify-center flex-1 relative w-full px-4 sm:px-6 md:px-5 lg:px-0', className)}>
      <img
        src={imageUrl}
        alt="logo"
        className={cn('relative left-2 top-2 transition-all z-10 duration-300 mx-auto', {
          // Мобильные размеры (телефоны)
          'w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]': size === 20,
          'w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]': size === 30,
          'w-[220px] h-[220px] sm:w-[280px] sm:h-[280px]': size === 40,
          // iPad (планшеты)
          'md:w-[240px] md:h-[240px]': size === 20,
          'md:w-[280px] md:h-[280px]': size === 30,
          'md:w-[320px] md:h-[320px]': size === 40,
          // Десктоп
          'lg:w-[300px] lg:h-[300px]': size === 20,
          'lg:w-[400px] lg:h-[400px]': size === 30,
          'lg:w-[500px] lg:h-[500px]': size === 40,
        })}
      />

      {/* Декоративные круги - только на десктопе */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
      <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
    </div>
  );
};

'use client'

import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {useClickAway, useDebounce} from 'react-use';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setsearchQuery] = React.useState('');
  const [focused, setFocused] = React.useState(false); 
  const [products, setProducts] = React.useState<Product[]>([]);
  const ref = React.useRef(null);
  
  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
    try {
      const responce = await Api.products.search(searchQuery);
      setProducts(responce);
    } catch (error) {
      console.log(error);
    }
  },
  100,
  [searchQuery]
  ); // запрос на получение списка товаров 

  const onClickItem = () => {
    setFocused(false);
    setsearchQuery('');
    setProducts([]);
  }

  return (
    <>
    {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />}

     <div 
        ref={ref}
        className={cn('flex rounded-xl sm:rounded-2xl flex-1 justify-between relative h-9 sm:h-11 z-30', className)}>
        <Search className='absolute top-1/2 translate-y-[-50%] left-2 sm:left-3 h-4 sm:h-5 text-gray-400' />
        <input 
            className='rounded-xl sm:rounded-2xl outline-none w-full bg-gray-50 pl-9 sm:pl-11 text-sm sm:text-base'
            type="text"
            placeholder='Найти пиццу...'
            onFocus={() => setFocused(true)}
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)}
        />

        {products.length > 0 && (
        <div className={cn(
          'absolute w-full bg-white rounded-lg sm:rounded-xl py-2 top-12 sm:top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto',
          focused && 'visible opacity-100 top-11 sm:top-12',
        )}>
          {products.map((product) => (
            <Link 
              onClick={onClickItem}
              key={product.id}
              className='flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 hover:bg-primary/10' 
              href={`/product/${product.id}`}>
              <img 
                className='rounded-sm h-7 w-7 sm:h-8 sm:w-8' 
                src={product.imageUrl}
                alt={product.name}
                />
              <span className='text-sm sm:text-base'>{product.name}</span>
            </Link>
          ))}
        </div>
        )}
     </div>
    </>
  );
};

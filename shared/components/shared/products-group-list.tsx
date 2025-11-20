'use client';

import React from 'react';
import {useIntersection} from 'react-use';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  title: string;
  items: ProductWithRelations[]; 
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({ 
    title,
    items,
    listClassName, 
    categoryId,
    className,
    }) => {

  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if(intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title, setActiveCategoryId])

  return (
  <div className={className} id={title} ref={intersectionRef}>
    <Title text={title} size="lg" className="font-extrabold mb-3 sm:mb-4 lg:mb-5" />

    {/* Desktop: grid 3 колонки */}
    <div className={cn('hidden lg:grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
            <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                imageUrl={product.imageUrl}
                price={product.items[0].price}
                ingredients={product.ingredients}
            />
        ))}
    </div>

    {/* Мобильные и планшеты: горизонтальный скролл */}
    <div className={cn('flex lg:hidden flex-nowrap gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-2 sm:-mx-6 px-2 sm:px-6', listClassName)}>
        {items.map((product, i) => (
            <div key={product.id} className="inline-block min-w-[180px] sm:min-w-[220px] md:min-w-[260px] flex-shrink-0">
                <ProductCard 
                    id={product.id}
                    name={product.name}
                    imageUrl={product.imageUrl}
                    price={product.items[0].price}
                    ingredients={product.ingredients}
                />
            </div>
        ))}
        {/* Отступ справа для последнего элемента */}
        <div className="flex-shrink-0 w-2 sm:w-4"></div>
    </div>
  </div>
  )
};
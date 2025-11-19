'use client'

import {cn} from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { Category } from '@prisma/client';
import React from 'react';

interface Props {
    className?: string;
    items: Category[];
}


export const Categories: React.FC<Props> = ({ items, className }) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);


    return (
      <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl overflow-x-auto scrollbar-hide w-full sm:w-auto', className)}>
        {items.map(({name, id}, index) => (
            <a 
                className={cn(
                    'flex items-center font-bold h-9 sm:h-11 rounded-2xl px-3 sm:px-5 text-sm sm:text-base whitespace-nowrap flex-shrink-0',
                    categoryActiveId === id  && 'bg-white shadow-md shadow-gray-200 text-primary'
                )} 
                href={`/#${name}`}
                key={index}>
                <button>{name}</button>
            </a>
            ))
        }
      </div>
    );
};
import {cn} from '@/shared/lib/utils';
import React from 'react';
import { SortPopup } from './sort-popup';
import { Categories } from './categories';
import { Container } from './container';
import { Category } from '@prisma/client';

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({categories, className }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-3 sm:py-4 lg:py-5 shadow-lg shadow-black/5 z-10' ,className)}>
      <Container className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
      <Categories items={categories}/>
      <SortPopup />
    </Container>
    </div>
  );
};
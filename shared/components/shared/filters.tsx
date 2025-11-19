'use client';

import React from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useQueryFilters, useFilters, useIngredients } from '@/shared/hooks';

interface Props  {
  className?: string;
}

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters extends PriceProps{
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }))

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0] );
    filters.setPrices('priceTo', prices[1] );
  }
  
  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='mb-3 sm:mb-4 lg:mb-5 font-bold' />
      
      {/* Верхние чекбоксы */}
      <CheckboxFiltersGroup 
        title='Тип теста'
        name='sizes'
        className='mb-4 sm:mb-5'
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]} 
        selected={filters.pizzaTypes}
        onClickCheckbox={filters.setPizzaTypes}
      />

      <CheckboxFiltersGroup 
        title='Размеры'
        name='sizes'
        className='mb-4 sm:mb-5'
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]} 
        selected={filters.sizes}
        onClickCheckbox={filters.setSizes}
      />
    {/* </div>
      <div className='flex flex-col gap-4'>
        <FilterCheckbox name='qw' text='Можно собирать' value="1" />
        <FilterCheckbox name='qwe' text='Новинки' value="2" />
      </div> */}

      {/* Фильтр цены */}
      <div className='mt-4 sm:mt-5 border-y border-y-neutral-100 py-4 sm:py-5 lg:py-6 pb-5 sm:pb-6 lg:pb-7'>
        <p className='font-bold mb-2 sm:mb-3 text-sm sm:text-base'>Цена от и до:</p>
        <div className='flex gap-2 sm:gap-3 mb-4 sm:mb-5'>
          <Input 
            type='number' 
            placeholder='0' 
            min={0} 
            max={1000} 
            value={String( filters.prices.priceFrom )}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input 
            type='number' 
            min={100} 
            max={1000} 
            placeholder='1000' 
            value={String( filters.prices.priceTo )}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider 
          min={0} 
          max={3000} 
          step={100} 
          value={[ filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrices}
          />
      </div>

      <CheckboxFiltersGroup 
        title='Ингредиенты'
        name='ingredients'
        className='mt-4 sm:mt-5'
        limit={8}
        defaultItems={items.slice(0, 8)}
        items={items} 
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
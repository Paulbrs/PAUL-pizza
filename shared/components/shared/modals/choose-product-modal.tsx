'use client'

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '../product-form';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'; 

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent  
            className={cn(
              'p-0 w-[calc(100vw-24px)] max-w-[1060px] min-h-0 max-h-[calc(100dvh-24px)] bg-white overflow-y-auto overflow-x-hidden',
              'sm:w-[calc(100vw-48px)] sm:max-h-[calc(100dvh-48px)]',
              'lg:w-[calc(100vw-64px)] lg:min-h-[500px] lg:max-h-[calc(100dvh-64px)]',
              'xl:w-[1060px]',
              className,
            )}>
             <ProductForm product={product} onSubmit={() => router.back()}/> 
        <DialogTitle>
          <VisuallyHidden>Product Details</VisuallyHidden> 
        </DialogTitle>      
        </DialogContent>
    </Dialog>
  );
};
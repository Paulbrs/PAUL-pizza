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
              'p-0 w-[1060px] max-w-[1060px] min-h-[500px] max-h-[500vh] bg-white overflow-hidden',
              'lg:w-[1060px] lg:max-w-[1060px]',
              'md:w-[90%] md:max-w-[700px] md:max-h-[90vh]',
              'sm:w-[90%] sm:max-w-[90%] sm:max-h-[90vh]',
              'w-[85%] max-w-[85%] max-h-[90vh]',
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
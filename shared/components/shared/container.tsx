import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={cn('w-full max-w-[90%] md:max-w-[90%] lg:max-w-[1280px] mx-auto px-2 sm:px-6 lg:px-8', className)}>{children}</div>;
};

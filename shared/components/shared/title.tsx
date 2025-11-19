import clsx from 'clsx';
import React from 'react';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Props {
  size?: TitleSize;
  className?: string;
  text: string;
}

export const Title: React.FC<Props> = ({ text, size = 'sm', className }) => {
  const mapTagBySize = {
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
    '2xl': 'h1',
  } as const;

  const mapClassNameBySize = {
    xs: 'text-sm sm:text-base',
    sm: 'text-base sm:text-lg lg:text-[22px]',
    md: 'text-lg sm:text-xl lg:text-[26px]',
    lg: 'text-xl sm:text-2xl lg:text-[32px]',
    xl: 'text-2xl sm:text-3xl lg:text-[40px]',
    '2xl': 'text-3xl sm:text-4xl lg:text-[48px]',
  } as const;

  return React.createElement(
    mapTagBySize[size],
    { className: clsx(mapClassNameBySize[size], className) },
    text,
  );
};

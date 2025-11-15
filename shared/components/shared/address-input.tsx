'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void
}
export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions 
      token={process.env.NEXT_PUBLIC_DADATA_TOKEN as string} 
      onChange={(data) => onChange?.(data?.value)}
    /> 
  );
};
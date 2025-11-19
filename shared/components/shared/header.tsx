'use client';

import {cn} from '@/shared/lib/utils'
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { useRouter } from "next/navigation";
import { AuthModal } from './modals';
interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const router = useRouter();
  const [ openAuthModal, setOpenAuthModal ] = React.useState(false);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = '';

    if(searchParams.has('paid')) {
        toastMessage = ('Заказ успешно оплачен! Информация отправлена на Вашу почту.');
    }


    if (searchParams.has('verified')) {
      toastMessage = "Почта успешна подтверждена!";
    }

    if(toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, [])  

  return (
    <header className={cn('border-b', className)}>
        <Container className='flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 py-4 sm:py-6 lg:py-8'>
            {/* Левая часть*/}
            <Link href='/'>
            <div className='flex items-center gap-2 sm:gap-4'>
                <Image src="/logo.png" alt="logo" width={35} height={35} className='w-8 h-8 sm:w-[35px] sm:h-[35px]'/>
                <div>
                  <h1 className='text-lg sm:text-xl lg:text-2xl uppercase font-black'>Paul Pizza</h1>
                  <p className='text-xs sm:text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
                </div>  
            </div>
            </Link>

            {hasSearch && <div className='w-full sm:mx-6 lg:mx-10 sm:flex-1 order-3 sm:order-2'>
              <SearchInput />
            </div>
            }

            {/* Правая часть*/}
            <div className='flex items-center gap-2 sm:gap-3 order-2 sm:order-3'>
             {/* добавляем отображение пользователя */}
              <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>

              <ProfileButton 
                onClickSignIn={() => setOpenAuthModal(true)}
              />

              {hasCart && <CartButton />}
            </div>
        </Container>
    </header>
  );
};
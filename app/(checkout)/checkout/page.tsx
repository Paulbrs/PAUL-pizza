'use client';

import { Suspense } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { 
  Title, 
  Container, 
  CheckoutSidebar, 
  CheckoutAddressForm, 
  CheckoutCart, 
  CheckoutPersonalForm
} from "@/shared/components/";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants/";
import { useCart } from "@/shared/hooks";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

function CheckoutContent() {
    const [ submitting, setSubmitting ] = React.useState(false);
    const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
    const { data: session } = useSession();
    
    const form = useForm<CheckoutFormValues>({
      resolver: zodResolver(checkoutFormSchema),
      defaultValues: {
        email: '',
        firstName: session?.user?.name || '',
        lastName: '',
        phone: '',
        address: '',
        comment: '',
      }
    });

    React.useEffect(() => {
      async function fetchUserInfo() {
        try {
          const data = await Api.auth.getMe();
          const [firstName, lastName ] = data.fullName.split(' ');

          form.setValue('firstName', firstName);
          form.setValue('lastName', lastName);
          form.setValue('email', data.email);
        } catch (error) {
          console.log('Error fetching user info:', error);
        }
      }
      
      if(session){
        fetchUserInfo();
      }
    }, [session]);

    const onSubmit = async (data: CheckoutFormValues) => {
      try {
        setSubmitting(true);

        const url = await createOrder(data);

        if (url) {
          toast.success('Заказ успешно создан!📝Переход на оплату...', {
            icon: '✅',
          });

          setTimeout(() => {
            location.href = url;
          }, 1000);
        } else {
          toast.success('Заказ успешно создан!📝 (тестовый режим)', {
            icon: '✅',
          });

          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }

      } catch (err) {
        console.log(err);
        setSubmitting(false);
        toast.error('Не удалось создать заказ', {
          icon: '❌',
        });
      } 
    };

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
      const newQuantity = type == 'plus' ? quantity + 1 : quantity - 1;
      updateItemQuantity(id, newQuantity);
    };

    return (
      <Container className="mt-5">
        <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]' />

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-10">
              <div className="flex flex-col gap-10 flex-1 mb-20">
                <CheckoutCart 
                  onClickCountButton={onClickCountButton}
                  removeCartItem={removeCartItem}
                  items={items}
                  loading={loading}
                />

                <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
                <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
              </div>

              <div className="w-[450px]">
                <CheckoutSidebar 
                  totalAmount={totalAmount} 
                  loading={loading || submitting}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </Container>
    );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

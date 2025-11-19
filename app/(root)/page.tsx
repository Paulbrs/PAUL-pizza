
import { Container, Title, TopBar, Filters, ProductsGroupList, Stories } from "@/shared/components/shared";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home(props: { searchParams: Promise<GetSearchParams> }) {
  const searchParams = await props.searchParams;
  const categories = await findPizzas(searchParams);


  return (
    <>
      <Container className="mt-5 sm:mt-8 lg:mt-10">
        <Title text="Все пиццы" size='lg' className="font-extrabold"/>
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)}/>

      <Stories />

      <Container className="mt-5 sm:mt-8 lg:mt-10 pb-8 sm:pb-12 lg:pb-14">
        <div className='flex flex-col lg:flex-row gap-5 sm:gap-8 lg:gap-[60px]'>

        {/* Фильтрация */}
          <div className="w-full lg:w-[250px]">
            <Suspense><Filters /></Suspense>
          </div>
        {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
            {
              categories.map(
                (category) => (
                category.products.length > 0 && (
                  <ProductsGroupList 
                    key={category.id}
                    title={category.name} 
                    categoryId={category.id}
                    items={category.products}
                  />
                )
              ))
            }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

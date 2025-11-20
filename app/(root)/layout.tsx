import { Footer, Header } from "@/shared/components/shared";
import type { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Paul Pizza | Главная",
  description: "This is online pizza shop",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
        {children}
        {modal}
        <Footer />
    </main>
  );
}

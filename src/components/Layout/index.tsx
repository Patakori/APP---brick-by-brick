import { ReactNode } from 'react';

import { Header } from '../Header';

interface PropsLayout{
  children: ReactNode
}

export default function Layout({ children }:PropsLayout) {
  return (
    <div className="flex flex-col bg-white min-h-screen"
    >
      <Header />

      <main className="flex w-full justify-center h-[90vh]">
        {children}
      </main>
    </div>

  );
}

import { ReactNode } from 'react';

import { Header } from '../Header';

interface PropsLayout{
  children: ReactNode
}

export default function Layout({ children }:PropsLayout) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-800"
    >
      <Header />

      <main className="flex w-full justify-center min-h-[90vh]">
        {children}
      </main>
    </div>

  );
}

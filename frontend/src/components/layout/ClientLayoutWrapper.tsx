'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChat = pathname === '/chat';

  return (
    <>
      <main className={`min-w-0 w-full flex-1 ${isChat ? '' : 'pb-20 md:pb-0'}`}>
        {children}
      </main>
      {!isChat && <Footer />}
    </>
  );
}

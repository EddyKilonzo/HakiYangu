import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { PillNav } from '@/components/layout/PillNav';
import { MobileDock } from '@/components/layout/MobileDock';
import { AOSInit } from '@/components/common/AOSInit';
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper';

const playfair = Playfair_Display({ variable: '--font-playfair', subsets: ['latin'], display: 'swap' });
const dmSans   = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'HakiYangu — Know Your Rights',
  description: 'Free legal rights information for Kenyans, powered by Kenyan law.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen min-w-0 flex-col" style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}>
        <ThemeProvider>
          <LanguageProvider>
            <AOSInit />
            <PillNav />
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            <MobileDock />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { PillNav } from '@/components/layout/PillNav';
import { Footer } from '@/components/layout/Footer';
import { MobileDock } from '@/components/layout/MobileDock';
import { AOSInit } from '@/components/common/AOSInit';

const playfair = Playfair_Display({ variable: '--font-playfair', subsets: ['latin'], display: 'swap' });
const dmSans   = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'HakiYangu — Know Your Rights',
  description: 'Free legal rights information for Kenyans, powered by Kenyan law.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col" style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}>
        <ThemeProvider>
          <LanguageProvider>
            <AOSInit />
            <PillNav />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <Footer />
            <MobileDock />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/common/LanguageToggle';

function ScalesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="14" y1="4" x2="14" y2="24" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="8" x2="22" y2="8" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 8 L3 14 Q5 17 9 14 Z" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M22 8 L19 14 Q21 17 25 14 Z" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="10" y1="24" x2="18" y2="24" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/chat', label: t.nav.chat },
    { href: '/about', label: t.nav.about },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#1B4332]/10 bg-[#F8F6F0]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <ScalesIcon />
          <span className="font-serif text-xl font-bold text-[#1B4332]">HakiYangu</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-150 ${
                pathname === href
                  ? 'text-[#1B4332] underline decoration-[#D4AF37] underline-offset-4'
                  : 'text-[#1C1C1C]/70 hover:text-[#1B4332]'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <LanguageToggle />
      </div>
    </nav>
  );
}

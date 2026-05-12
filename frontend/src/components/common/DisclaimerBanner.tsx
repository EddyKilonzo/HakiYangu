'use client';

import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export function DisclaimerBanner() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHero = pathname === '/';

  return (
    <div
      className="px-4 py-1.5 text-center text-xs transition-all duration-500"
      style={{
        borderBottom: isHero ? '1px solid rgba(219,26,26,0.06)' : '1px solid rgba(219,26,26,0.15)',
        background: isHero ? 'rgba(0,0,0,0.0)' : 'rgba(219,26,26,0.06)',
        color: isHero ? 'rgba(100,60,60,0.45)' : 'var(--color-text-muted)',
      }}
    >
      {t.disclaimer.short}
    </div>
  );
}

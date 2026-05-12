'use client';

import Marquee from 'react-fast-marquee';
import { useLanguage } from '@/contexts/LanguageContext';

interface MarqueeStripProps {
  variant?: 'dark' | 'light';
}

export function MarqueeStrip({ variant = 'dark' }: MarqueeStripProps) {
  const { t } = useLanguage();
  const items = variant === 'dark' ? t.marquee.laws : t.marquee.rights;
  const isDark = variant === 'dark';

  return (
    <div
      className="overflow-hidden py-3"
      style={{
        background: isDark ? 'var(--color-primary)' : 'var(--color-surface)',
        borderTop: isDark ? 'none' : '1px solid var(--color-border)',
        borderBottom: isDark ? 'none' : '1px solid var(--color-border)',
      }}
    >
      <Marquee speed={45} autoFill pauseOnHover gradient={false}>
        {items.map((item, i) => (
          <span
            key={i}
            className="mx-6 font-medium tracking-wide text-sm"
            style={{ color: isDark ? '#FFF6F6' : 'var(--color-primary)' }}
          >
            {item}
            <span className="mx-6" style={{ color: isDark ? 'rgba(255,246,246,0.35)' : 'rgba(219,26,26,0.3)' }}>•</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

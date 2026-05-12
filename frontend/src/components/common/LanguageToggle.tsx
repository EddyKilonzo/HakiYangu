'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="flex items-center gap-1 rounded-full p-1"
      style={{ border: '1px solid rgba(219,26,26,0.2)', background: 'var(--color-surface-raised)' }}
    >
      {(['en', 'sw'] as const).map(lang => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
          style={
            language === lang
              ? { background: 'var(--color-primary)', color: '#FFF6F6' }
              : { background: 'transparent', color: 'var(--color-primary)' }
          }
          aria-label={lang === 'en' ? 'Switch to English' : 'Badilisha kwa Kiswahili'}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const TRUST_ICONS = [
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
];

const ACCENT_COLORS = [
  { bg: 'rgba(219,26,26,0.08)', border: 'rgba(219,26,26,0.18)', icon: 'var(--color-primary)', bar: '#DB1A1A' },
  { bg: 'rgba(212,175,55,0.08)', border: 'rgba(212,175,55,0.25)', icon: 'var(--color-accent)', bar: '#D4AF37' },
  { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', icon: '#16a34a', bar: '#16a34a' },
  { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', icon: '#6366f1', bar: '#6366f1' },
];

export function TrustStrip() {
  const { t } = useLanguage();

  return (
    <section
      className="py-16"
      style={{
        background: 'var(--color-surface-raised)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center" data-aos="fade-up">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>
            Why Trust HakiYangu
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4" data-aos="fade-up" data-aos-delay="50">
          {t.trust.items.map((item, i) => {
            const Icon = TRUST_ICONS[i];
            const colors = ACCENT_COLORS[i];
            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300"
                style={{
                  background: 'var(--color-surface)',
                  border: `1px solid ${colors.border}`,
                  boxShadow: 'var(--shadow-default)',
                }}
                data-aos="zoom-in"
                data-aos-delay={`${i * 80}`}
              >
                {/* Colored top bar */}
                <div
                  className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
                  style={{ background: colors.bar }}
                />

                <div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: colors.bg, color: colors.icon }}
                >
                  <Icon />
                </div>

                <h3
                  className="mb-1.5 font-semibold text-sm leading-snug"
                  style={{ color: 'var(--color-text)' }}
                >
                  {item.label}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {item.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

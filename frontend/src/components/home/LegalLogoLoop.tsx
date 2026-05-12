'use client';

import LogoLoop from './LogoLoop';
import { useLanguage } from '@/contexts/LanguageContext';

function LawIcon({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap"
      style={{
        borderColor: 'rgba(219,26,26,0.2)',
        color: 'var(--color-primary)',
        background: 'var(--color-surface-raised)',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      {label}
    </span>
  );
}

const EN_LOGOS = [
  'Kenya Law', 'Law Society of Kenya', 'Katiba Institute',
  'Legal Aid Centre', 'KNCHR', 'Strathmore Law',
  'Judiciary of Kenya', 'ODPP Kenya', 'Kenya Law Reform',
];

const SW_LOGOS = [
  'Sheria ya Kenya', 'Chama cha Wanasheria', 'Taasisi ya Katiba',
  'Kituo cha Msaada', 'KNCHR', 'Strathmore Law',
  'Mahakama ya Kenya', 'ODPP Kenya', 'Marekebisho ya Sheria',
];

export function LegalLogoLoop() {
  const { language } = useLanguage();
  const labels = language === 'sw' ? SW_LOGOS : EN_LOGOS;

  const logos = labels.map(label => ({
    node: <LawIcon label={label} />,
    title: label,
  }));

  return (
    <section className="py-12 overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      <div className="mb-6 text-center" data-aos="fade-up">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          {language === 'sw' ? 'Inayohusu Taasisi za Kisheria' : 'Covering Kenya\'s Legal Institutions'}
        </p>
      </div>
      <div style={{ height: '60px', overflow: 'hidden', position: 'relative' }}>
        <LogoLoop
          logos={logos}
          speed={60}
          direction="left"
          logoHeight={40}
          gap={16}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="var(--color-surface, #FFF6F6)"
        />
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Scenario } from '@/lib/types';

const ICON_MAP: Record<string, () => React.ReactElement> = {
  home: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  briefcase: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  ),
  'shopping-cart': () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  ),
  car: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2" />
      <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
    </svg>
  ),
  clipboard: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
    </svg>
  ),
  users: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

interface ScenariosGridProps { scenarios: Scenario[]; }

export function ScenariosGrid({ scenarios }: ScenariosGridProps) {
  const { t, language } = useLanguage();
  const router = useRouter();

  const handleSelect = (scenario: Scenario) => {
    const question = language === 'sw' ? scenario.quickQuestionSw : scenario.quickQuestionEn;
    sessionStorage.setItem('hakiyangu-prefill', question);
    router.push('/chat');
  };

  return (
    <section className="py-20" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center" data-aos="fade-up">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl" style={{ color: 'var(--color-text)' }}>
            {t.scenarios.title}
          </h2>
          <div className="mx-auto h-px w-16" style={{ background: 'var(--color-primary)' }} />
          <p className="mt-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>{t.scenarios.subtitle}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario, i) => {
            const Icon = ICON_MAP[scenario.icon] ?? ICON_MAP.clipboard;
            const title = language === 'sw' ? scenario.titleSw : scenario.titleEn;
            const description = language === 'sw' ? scenario.descriptionSw : scenario.descriptionEn;

            return (
              <button
                key={scenario.id}
                onClick={() => handleSelect(scenario)}
                data-aos="zoom-in"
                data-aos-delay={`${i * 80}`}
                className="group rounded-2xl p-6 text-left transition-all duration-200"
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-default)',
                }}
              >
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200"
                  style={{ background: 'rgba(219,26,26,0.08)', color: 'var(--color-primary)' }}
                >
                  <Icon />
                </div>
                <h3 className="mb-2 font-semibold" style={{ color: 'var(--color-text)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

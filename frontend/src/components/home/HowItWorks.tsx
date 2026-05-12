'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const STEP_ICONS = [
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
];

function StepCard({ step, i, totalSteps }: { step: { title: string; description: string }; i: number; totalSteps: number }) {
  const Icon = STEP_ICONS[i];

  return (
    <div className="relative h-full">
      {i < totalSteps - 1 && (
        <div
          className="absolute right-0 top-12 hidden h-px md:block"
          style={{ background: 'var(--color-accent)', right: '-2rem', width: '2rem', opacity: 0.4 }}
        />
      )}

      <div
        className="relative h-full rounded-2xl p-8"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-default)',
        }}
      >
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            border: '2px solid var(--color-accent)',
            background: 'rgba(212,175,55,0.08)',
            color: 'var(--color-primary)',
          }}
        >
          <Icon />
        </div>

        <div
          className="mb-2 text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)' }}
        >
          {String(i + 1).padStart(2, '0')}
        </div>

        <h3
          className="mb-3 font-semibold text-base"
          style={{ color: 'var(--color-text)' }}
        >
          {step.title}
        </h3>

        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-24 scroll-mt-20" style={{ background: 'var(--color-surface-raised)' }}>
      <div className="mx-auto max-w-6xl px-4">
        <div
          className="mb-16 text-center"
          data-aos="fade-up"
        >
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl" style={{ color: 'var(--color-text)' }}>
            {t.howItWorks.title}
          </h2>
          <div
            className="mx-auto h-px w-16"
            style={{ background: 'var(--color-accent)' }}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {t.howItWorks.steps.map((step, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 150} className="h-full">
              <StepCard step={step} i={i} totalSteps={t.howItWorks.steps.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

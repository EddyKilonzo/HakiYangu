'use client';

import { useEffect, useState } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { MarqueeStrip } from '@/components/home/MarqueeStrip';
import { ScenariosGrid } from '@/components/home/ScenariosGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TrustStrip } from '@/components/home/TrustStrip';
import { LegalLogoLoop } from '@/components/home/LegalLogoLoop';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { TeamSection } from '@/components/home/TeamSection';
import { Scenario } from '@/lib/types';
import { getScenarios } from '@/lib/api';

function ScenariosSkeleton() {
  return (
    <section className="py-20" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 h-8 w-64 animate-pulse rounded-lg" style={{ background: 'var(--color-border)' }} />
          <div className="mx-auto h-px w-16" style={{ background: 'var(--color-accent)' }} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ background: 'var(--color-surface-raised)', boxShadow: 'var(--shadow-card)' }}>
              <div className="mb-4 h-12 w-12 animate-pulse rounded-xl" style={{ background: 'var(--color-border)' }} />
              <div className="mb-2 h-4 w-3/4 animate-pulse rounded" style={{ background: 'var(--color-border)' }} />
              <div className="h-3 w-full animate-pulse rounded" style={{ background: 'var(--color-border)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScenarios()
      .then(d => setScenarios(d.scenarios))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <HeroSection />
      <MarqueeStrip variant="dark" />
      <LegalLogoLoop />
      <TrustStrip />
      {loading ? <ScenariosSkeleton /> : <ScenariosGrid scenarios={scenarios} />}
      <TestimonialsSection />
      <MarqueeStrip variant="light" />
      <HowItWorks />
      <TeamSection />
    </>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Suspense, lazy, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import TrueFocus from '@/components/common/TrueFocus';

const Antigravity = lazy(() => import('./Antigravity'));

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroSection() {
  const { t } = useLanguage();
  const sentence = `${t.hero.titleBefore}${t.hero.titleHighlight}${t.hero.titleAfter ? ' ' + t.hero.titleAfter.trim() : ''}`.trim();
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: '#000' }}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursor({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
    >
      {/* Background photo */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="w-full object-cover"
          style={{ opacity: 0.55, height: '100vh', minHeight: '100%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.62) 0%, rgba(26,5,5,0.55) 50%, rgba(0,0,0,0.7) 100%)' }}
        />
      </div>

      {/* Antigravity particles */}
      <Suspense fallback={null}>
        <Antigravity
          count={10}
          color="#D4AF37"
          magnetRadius={8}
          ringRadius={6}
          particleSize={1.0}
          autoAnimate
          waveAmplitude={0.5}
          lerpSpeed={0.04}
        />
      </Suspense>

      {/* Cursor-following red spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 36% 30% at ${cursor.x}% ${cursor.y}%, rgba(219,26,26,0.22) 0%, transparent 68%)`,
          zIndex: 2,
        }}
      />

      {/* Warm ambient glow at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 35% at 50% 100%, rgba(212,175,55,0.08) 0%, transparent 60%)',
          zIndex: 2,
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-32 md:py-40" style={{ zIndex: 10 }}>
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="mb-6 inline-block rounded-full border px-5 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ borderColor: 'rgba(212,175,55,0.4)', color: '#D4AF37' }}
            >
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 w-full"
          >
            <TrueFocus
              key={sentence}
              sentence={sentence}
              borderColor="#DB1A1A"
              glowColor="rgba(219,26,26,0.6)"
              blurAmount={5}
              animationDuration={0.7}
              pauseBetweenAnimations={1.5}
              className="text-5xl font-bold md:text-7xl"
              style={{ color: '#FFF6F6', fontFamily: 'var(--font-playfair), Georgia, serif' } as React.CSSProperties}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-10 max-w-xl text-lg leading-relaxed"
            style={{ color: 'rgba(255,246,246,0.78)' }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:opacity-90"
              style={{ background: '#DB1A1A', color: '#FFF6F6', boxShadow: 'var(--shadow-default)' }}
            >
              {t.hero.ctaChat}
              <ArrowRightIcon />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:opacity-80"
              style={{ borderColor: 'rgba(255,246,246,0.25)', color: '#FFF6F6', backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.06)' }}
            >
              {t.hero.ctaLearn}
            </Link>
          </motion.div>

          {/* Legal Disclaimer Integrated */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 max-w-2xl text-[10px] uppercase tracking-[0.2em] font-bold"
            style={{ color: 'rgba(219,26,26,0.6)' }}
          >
            {t.disclaimer.short}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'rgba(255,246,246,0.3)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

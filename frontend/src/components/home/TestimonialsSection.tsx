'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const InfiniteMenu = dynamic(() => import('./InfiniteMenu'), { ssr: false });

const AFRICAN_PHOTOS = [
  'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?auto=format&fit=crop&w=400&q=80',
];

function QuoteIcon() {
  return (
    <svg width="28" height="24" viewBox="0 0 36 30" fill="currentColor" style={{ opacity: 0.18 }}>
      <path d="M0 30V18C0 13 1.5 8.833 4.5 5.5C7.5 2.167 11.667 0.333 17 0L18 3C15 3.667 12.583 5.083 10.75 7.25C8.917 9.25 8 11.667 8 14.5H15V30H0ZM20 30V18C20 13 21.5 8.833 24.5 5.5C27.5 2.167 31.667 0.333 37 0L38 3C35 3.667 32.583 5.083 30.75 7.25C28.917 9.25 28 11.667 28 14.5H35V30H20Z"/>
    </svg>
  );
}

export function TestimonialsSection() {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const prevIndex = useRef(0);

  useEffect(() => {
    if (prevIndex.current === activeIndex) return;
    prevIndex.current = activeIndex;
    setVisible(false);
    const id = setTimeout(() => setVisible(true), 180);
    return () => clearTimeout(id);
  }, [activeIndex]);

  const items = useMemo(
    () =>
      AFRICAN_PHOTOS.map((photo, i) => ({
        image: photo,
        link: '#',
        title: t.testimonials.items[i]?.name ?? '',
        description: t.testimonials.items[i]?.role ?? '',
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language]
  );

  const active = t.testimonials.items[activeIndex] ?? t.testimonials.items[0];
  const photo = AFRICAN_PHOTOS[activeIndex] ?? AFRICAN_PHOTOS[0];

  return (
    <section
      style={{
        background: 'var(--color-dark)',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ───────────────────────────────────────── */}
      <div className="shrink-0 pt-10 pb-2 text-center px-4" data-aos="fade-down">
        <span
          className="mb-3 inline-block rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-widest"
          style={{ borderColor: 'rgba(212,175,55,0.3)', color: '#D4AF37' }}
        >
          {t.testimonials.subtitle}
        </span>
        <h2 className="mt-2 font-serif text-2xl font-bold md:text-3xl" style={{ color: '#FFF6F6' }}>
          {t.testimonials.title}
        </h2>
        <div className="mx-auto mt-3 h-px w-12" style={{ background: '#D4AF37' }} />
        <p className="mt-2 text-xs" style={{ color: 'rgba(255,246,246,0.38)' }}>
          Spin the globe — click any face to read their story
        </p>
      </div>

      {/* ── Globe — fills all remaining space ────────────── */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative', width: '100%' }}>
        <InfiniteMenu
          items={items}
          scale={1}
          onActiveItemChange={(index: number) =>
            setActiveIndex(index % t.testimonials.items.length)
          }
        />
      </div>

      {/* ── Review card ──────────────────────────────────── */}
      <div className="shrink-0 px-4 pb-8">
        <div
          className="mx-auto max-w-2xl rounded-2xl px-6 py-5 transition-all duration-300"
          style={{
            background: 'rgba(255,246,246,0.04)',
            border: '1px solid rgba(212,175,55,0.15)',
            boxShadow: 'var(--shadow-default)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          <div className="mb-3" style={{ color: '#D4AF37' }}>
            <QuoteIcon />
          </div>
          <p className="mb-4 text-sm leading-relaxed italic" style={{ color: 'rgba(255,246,246,0.82)' }}>
            &ldquo;{active.quote}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <img
              src={photo}
              alt={active.name}
              className="h-10 w-10 rounded-full object-cover flex-shrink-0"
              style={{ border: '2px solid rgba(212,175,55,0.55)' }}
            />
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color: '#FFF6F6' }}>{active.name}</p>
              <p className="text-xs truncate" style={{ color: 'rgba(255,246,246,0.45)' }}>{active.role}</p>
            </div>
            <div className="ml-auto flex gap-2 shrink-0">
              {t.testimonials.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activeIndex === i ? '22px' : '6px',
                    height: '6px',
                    background: activeIndex === i ? '#D4AF37' : 'rgba(212,175,55,0.28)',
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

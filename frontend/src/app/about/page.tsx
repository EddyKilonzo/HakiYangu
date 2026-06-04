'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
const TEAM = [
  {
    name: 'Martha Ngendo',
    role: 'Product Lead',
    bio: 'Drives the vision of making Kenyan legal information accessible to every citizen, in every corner of the country.',
    initials: 'MN',
    color: '#DB1A1A',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'Eddy Max Kilonzo',
    role: 'Software Engineer',
    bio: 'Builds the APIs and data pipelines that connect HakiYangu to authoritative Kenyan legal sources.',
    initials: 'EK',
    color: '#D4AF37',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'John Brandews',
    role: 'Full-Stack Developer',
    bio: 'Crafts the seamless experience from the AI chat engine to the responsive interfaces Kenyans rely on daily.',
    initials: 'JB',
    color: '#16a34a',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'Felix Tony Maloba',
    role: 'UI/UX Designer',
    bio: 'Ensures every interaction on HakiYangu feels intuitive, trustworthy, and distinctly Kenyan.',
    initials: 'FM',
    color: '#6366f1',
    github: '#',
    linkedin: '#',
  },
];

const VALUES = [
  {
    color: { bg: 'rgba(219,26,26,0.08)', border: 'rgba(219,26,26,0.18)', bar: '#DB1A1A', icon: 'var(--color-primary)' },
    icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    key: 'knowledge',
    label: 'Knowledge for All',
    sub: 'Every Kenyan deserves to understand the laws that govern their lives.',
  },
  {
    color: { bg: 'rgba(212,175,55,0.1)', border: 'rgba(212,175,55,0.3)', bar: '#D4AF37', icon: '#b8922e' },
    icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    key: 'language',
    label: 'Bilingual by Design',
    sub: 'Full support in English and Kiswahili — meeting Kenyans where they are.',
  },
  {
    color: { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', bar: '#16a34a', icon: '#16a34a' },
    icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    key: 'access',
    label: 'Free & Accessible',
    sub: 'No fees, no registration. Legal information should never have a price tag.',
  },
];

const STATS = [
  { value: '47', label: 'Counties served', suffix: '' },
  { value: '20', label: 'Kenyan laws referenced', suffix: '+' },
  { value: '2', label: 'Languages supported', suffix: '' },
  { value: '24', label: 'Hours available', suffix: '/7' },
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div style={{ background: 'var(--color-surface)' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{ background: '#000' }}
      >
        <img
          src="https://picsum.photos/seed/kenya-law/1600/700"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.35 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(26,5,5,0.5) 100%)' }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div data-aos="fade-down">
            <span
              className="mb-4 inline-block rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-widest"
              style={{ borderColor: 'rgba(212,175,55,0.4)', color: '#D4AF37' }}
            >
              Our Story
            </span>
          </div>
          <h1
            className="mb-6 font-serif text-4xl font-bold leading-tight md:text-6xl"
            style={{ color: '#FFF6F6' }}
            data-aos="fade-up"
            data-aos-delay="60"
          >
            {t.about.title}
          </h1>
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed"
            style={{ color: 'rgba(255,246,246,0.75)' }}
            data-aos="fade-up"
            data-aos-delay="120"
          >
            {t.about.mission}
          </p>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <section
        className="py-12"
        style={{ background: 'var(--color-surface-raised)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="text-center"
                data-aos="zoom-in"
                data-aos-delay={`${i * 80}`}
              >
                <p className="font-serif text-4xl font-bold md:text-5xl" style={{ color: 'var(--color-primary)' }}>
                  {s.value}<span style={{ color: 'var(--color-accent)' }}>{s.suffix}</span>
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div data-aos="fade-right">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>
                {t.about.missionTitle}
              </p>
              <h2 className="mb-5 font-serif text-3xl font-bold leading-snug md:text-4xl" style={{ color: 'var(--color-text)' }}>
                Bridging the Gap Between Kenyans and the Law
              </h2>
              <p className="mb-6 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{t.about.mission}</p>
              <div
                className="mb-4 rounded-xl p-5"
                style={{ background: 'rgba(219,26,26,0.05)', border: '1px solid rgba(219,26,26,0.12)' }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{t.about.how}</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{t.about.howText}</p>
              </div>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: 'var(--color-primary)', color: '#FFF6F6', boxShadow: 'var(--shadow-default)' }}
              >
                Try HakiYangu
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>

            <div data-aos="fade-left" data-aos-delay="80">
              <div className="relative">
                <img
                  src="https://picsum.photos/seed/kenya-court/600/500"
                  alt="Kenyan courthouse"
                  className="w-full rounded-2xl object-cover"
                  style={{ height: '380px', boxShadow: 'var(--shadow-default)' }}
                />
                <div
                  className="absolute -bottom-4 -left-4 rounded-xl px-5 py-4"
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-default)',
                  }}
                >
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>Powered by</p>
                  <p className="font-serif font-bold" style={{ color: 'var(--color-primary)' }}>Kenyan Law</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: 'var(--color-surface-raised)', borderTop: '1px solid var(--color-border)' }}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center" data-aos="fade-up">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>Our Principles</p>
            <h2 className="font-serif text-3xl font-bold md:text-4xl" style={{ color: 'var(--color-text)' }}>
              What We Stand For
            </h2>
            <div className="mx-auto mt-4 h-px w-16" style={{ background: 'var(--color-accent)' }} />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <div
                key={v.key}
                className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300"
                style={{
                  background: 'var(--color-surface)',
                  border: `1px solid ${v.color.border}`,
                  boxShadow: 'var(--shadow-default)',
                }}
                data-aos="fade-up"
                data-aos-delay={`${i * 100}`}
              >
                <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl" style={{ background: v.color.bar }} />
                <div
                  className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: v.color.bg, color: v.color.icon }}
                >
                  <v.icon />
                </div>
                <h3 className="mb-2 font-semibold text-lg" style={{ color: 'var(--color-text)' }}>{v.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{v.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div data-aos="fade-right">
              <img
                src="https://picsum.photos/seed/ai-legal/600/450"
                alt="AI legal assistant"
                className="w-full rounded-2xl object-cover"
                style={{ height: '340px', boxShadow: 'var(--shadow-default)' }}
              />
            </div>
            <div data-aos="fade-left" data-aos-delay="80">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>Technology</p>
              <h2 className="mb-5 font-serif text-3xl font-bold" style={{ color: 'var(--color-text)' }}>{t.about.how}</h2>
              <p className="mb-6 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{t.about.howText}</p>

              <div
                className="rounded-xl border-l-4 p-5"
                style={{
                  borderLeftColor: 'var(--color-primary)',
                  background: 'rgba(219,26,26,0.04)',
                  border: '1px solid rgba(219,26,26,0.12)',
                  borderLeft: '4px solid var(--color-primary)',
                }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{t.about.limits}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{t.about.limitsText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: 'var(--color-dark)', borderTop: '1px solid rgba(219,26,26,0.15)' }}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center" data-aos="fade-up">
            <span
              className="mb-3 inline-block rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-widest"
              style={{ borderColor: 'rgba(212,175,55,0.35)', color: '#D4AF37' }}
            >
              The People Behind It
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl" style={{ color: '#FFF6F6' }}>
              Meet Our Team
            </h2>
            <div className="mx-auto mt-4 h-px w-16" style={{ background: '#D4AF37' }} />
            <p className="mt-4 text-sm max-w-xl mx-auto" style={{ color: 'rgba(255,246,246,0.5)' }}>
              Four Kenyans building the tool they always wished existed — free legal information for every Kenyan, in every county.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className="group relative overflow-hidden rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300"
                style={{
                  background: 'rgba(255,246,246,0.04)',
                  border: '1px solid rgba(212,175,55,0.12)',
                  boxShadow: 'var(--shadow-default)',
                }}
                data-aos="fade-up"
                data-aos-delay={`${i * 80}`}
              >
                <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: member.color }} />
                <div className="relative mb-4">
                  <div 
                    className="h-24 w-24 rounded-full flex items-center justify-center text-xl font-bold text-white"
                    style={{ 
                      background: 'rgba(255,246,246,0.08)', 
                      border: `3px solid ${member.color}44`,
                      color: member.color
                    }}
                  >
                    {member.initials}
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center"
                    style={{ background: member.color, border: '2px solid var(--color-dark)' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-serif font-bold text-base" style={{ color: '#FFF6F6' }}>{member.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: member.color }}>{member.role}</p>
                <p className="mt-3 text-xs leading-relaxed" style={{ color: 'rgba(255,246,246,0.5)' }}>{member.bio}</p>
                <div className="mt-4 flex gap-3">
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:opacity-80"
                      style={{ background: 'rgba(255,246,246,0.08)', color: 'rgba(255,246,246,0.6)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/></svg>
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:opacity-80"
                      style={{ background: 'rgba(255,246,246,0.08)', color: 'rgba(255,246,246,0.6)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Legal Resources ──────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: 'var(--color-surface-raised)', borderTop: '1px solid var(--color-border)' }}
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center" data-aos="fade-up">
            <h2 className="font-serif text-2xl font-bold md:text-3xl" style={{ color: 'var(--color-text)' }}>
              {t.footer.resources}
            </h2>
            <div className="mx-auto mt-4 h-px w-16" style={{ background: 'var(--color-accent)' }} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3" data-aos="fade-up" data-aos-delay="60">
            {[
              { label: t.footer.kenyaLaw, href: 'https://kenyalaw.org', desc: 'Official repository of Kenyan law and judgments' },
              { label: t.footer.lsk, href: 'https://lsk.or.ke', desc: 'Regulatory body for legal practitioners in Kenya' },
              { label: t.footer.legalAid, href: 'https://www.legalaidcentre.or.ke', desc: 'Free legal aid services in Nairobi' },
            ].map(({ label, href, desc }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-2xl p-6 transition-all duration-200"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-default)',
                  textDecoration: 'none',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-primary)' }}>{label}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-accent)' }}>
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

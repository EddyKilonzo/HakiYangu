'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { KenyaMap } from '@/components/common/KenyaMap';
const FAQ = [
  {
    q: 'Is HakiYangu free to use?',
    a: 'Yes. HakiYangu is completely free — no registration, no subscription, and no hidden fees.',
  },
  {
    q: 'Is this real legal advice?',
    a: 'No. HakiYangu provides legal information based on Kenyan law, not legal advice. For complex matters, consult a qualified advocate.',
  },
  {
    q: 'What languages does HakiYangu support?',
    a: 'HakiYangu is fully bilingual — English and Kiswahili. You can switch languages at any time.',
  },
  {
    q: 'Can I use HakiYangu on my phone?',
    a: 'Yes. The platform is fully responsive and works on all devices including smartphones and tablets.',
  },
];

function LocationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const INFO_ITEMS = [
  { icon: LocationIcon, label: 'Location', color: { bg: 'rgba(219,26,26,0.08)', icon: 'var(--color-primary)', bar: '#DB1A1A' }, key: 'nairobi' as const },
  { icon: GlobeIcon,   label: 'Languages', color: { bg: 'rgba(212,175,55,0.1)',  icon: '#b8922e',            bar: '#D4AF37' }, key: 'languages' as const },
  { icon: ClockIcon,   label: 'Availability', color: { bg: 'rgba(34,197,94,0.08)', icon: '#16a34a',            bar: '#16a34a' }, key: 'hours' as const },
];

export default function ContactPage() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ background: 'var(--color-surface)' }}>

      {/* ── Page hero ───────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: '#000' }}
      >
        <img
          src="https://picsum.photos/seed/nairobi-contact/1600/600"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.3 }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center" data-aos="fade-up">
          <span
            className="mb-4 inline-block rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: 'rgba(212,175,55,0.4)', color: '#D4AF37' }}
          >
            Reach Out
          </span>
          <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl" style={{ color: '#FFF6F6' }}>
            {t.contact.title}
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,246,246,0.72)' }}>
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* ── Info cards ──────────────────────────────────── */}
      <section className="py-14" style={{ background: 'var(--color-surface-raised)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-5 sm:grid-cols-3">
            {INFO_ITEMS.map((item, i) => (
              <div
                key={item.key}
                className="relative overflow-hidden rounded-2xl p-6"
                style={{ background: 'var(--color-surface)', border: `1px solid ${item.color.bar}22`, boxShadow: 'var(--shadow-default)' }}
                data-aos="fade-up"
                data-aos-delay={`${i * 80}`}
              >
                <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: item.color.bar }} />
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: item.color.bg, color: item.color.icon }}
                >
                  <item.icon />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
                <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{t.contact.info[item.key]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Map ──────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Contact form */}
            <div data-aos="fade-right">
              <h2 className="mb-2 font-serif text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                Send Us a Message
              </h2>
              <div className="mb-8 h-px w-12" style={{ background: 'var(--color-accent)' }} />

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                      style={{ background: 'var(--color-surface-raised)', border: '1px solid rgba(219,26,26,0.18)', color: 'var(--color-text)' }}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                      style={{ background: 'var(--color-surface-raised)', border: '1px solid rgba(219,26,26,0.18)', color: 'var(--color-text)' }}
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                    {t.contact.form.subject}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    style={{ background: 'var(--color-surface-raised)', border: '1px solid rgba(219,26,26,0.18)', color: 'var(--color-text)' }}
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                    {t.contact.form.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    style={{ background: 'var(--color-surface-raised)', border: '1px solid rgba(219,26,26,0.18)', color: 'var(--color-text)' }}
                    placeholder={t.contact.form.placeholder}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                  style={{ background: 'var(--color-primary)', color: '#FFF6F6', boxShadow: 'var(--shadow-default)' }}
                >
                  {sent ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      {t.contact.form.sent}
                    </>
                  ) : (
                    <>
                      {t.contact.form.send}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map */}
            <div data-aos="fade-left" data-aos-delay="80">
              <h2 className="mb-2 font-serif text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                {t.contact.mapTitle}
              </h2>
              <div className="mb-8 h-px w-12" style={{ background: 'var(--color-accent)' }} />
              <div
                className="overflow-hidden rounded-2xl"
                style={{ height: '420px', boxShadow: 'var(--shadow-default)', border: '1px solid var(--color-border)' }}
              >
                <KenyaMap />
              </div>
              <p className="mt-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Click on any city marker to learn more. Powered by OpenStreetMap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: 'var(--color-surface-raised)', borderTop: '1px solid var(--color-border)' }}
      >
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-10 text-center" data-aos="fade-up">
            <h2 className="font-serif text-2xl font-bold md:text-3xl" style={{ color: 'var(--color-text)' }}>
              {t.contact.faqTitle}
            </h2>
            <div className="mx-auto mt-4 h-px w-12" style={{ background: 'var(--color-accent)' }} />
          </div>

          <div className="flex flex-col gap-3">
            {FAQ.map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl transition-all duration-200"
                style={{
                  background: 'var(--color-surface)',
                  border: openFaq === i ? '1px solid rgba(219,26,26,0.3)' : '1px solid var(--color-border)',
                  boxShadow: openFaq === i ? 'var(--shadow-default)' : 'none',
                }}
                data-aos="fade-up"
                data-aos-delay={`${i * 60}`}
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sm pr-4" style={{ color: 'var(--color-text)' }}>{faq.q}</span>
                  <span
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{ color: 'var(--color-primary)', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

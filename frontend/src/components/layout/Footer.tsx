'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ borderTop: '1px solid rgba(219,26,26,0.15)', background: 'var(--color-dark)', color: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 font-serif text-lg font-bold" style={{ color: 'var(--color-accent)' }}>HakiYangu</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,246,246,0.65)' }}>{t.footer.tagline}</p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>
              {t.footer.links}
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,246,246,0.65)' }}>
              <li><Link href="/" className="transition-colors hover:opacity-100" style={{ color: 'rgba(255,246,246,0.65)' }}>{t.nav.home}</Link></li>
              <li><Link href="/chat" className="transition-colors hover:opacity-100" style={{ color: 'rgba(255,246,246,0.65)' }}>{t.nav.chat}</Link></li>
              <li><Link href="/about" className="transition-colors hover:opacity-100" style={{ color: 'rgba(255,246,246,0.65)' }}>{t.nav.about}</Link></li>
              <li><Link href="/contact" className="transition-colors hover:opacity-100" style={{ color: 'rgba(255,246,246,0.65)' }}>{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>
              {t.footer.resources}
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,246,246,0.65)' }}>
              <li>
                <a href="https://kenyalaw.org" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,246,246,0.65)' }}>
                  {t.footer.kenyaLaw}
                </a>
              </li>
              <li>
                <a href="https://lsk.or.ke" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,246,246,0.65)' }}>
                  {t.footer.lsk}
                </a>
              </li>
              <li>
                <a href="https://www.legalaidcentre.or.ke" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,246,246,0.65)' }}>
                  {t.footer.legalAid}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 text-center text-xs" style={{ borderTop: '1px solid rgba(255,246,246,0.1)', color: 'rgba(255,246,246,0.4)' }}>
          {t.footer.disclaimer}
        </div>
      </div>
    </footer>
  );
}

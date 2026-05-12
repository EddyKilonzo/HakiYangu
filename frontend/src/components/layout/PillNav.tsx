'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LanguageToggle } from '@/components/common/LanguageToggle';
import './PillNav.css';

function ScalesIcon() {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="11" y1="2" x2="11" y2="22" stroke="#DB1A1A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="22" x2="18" y2="22" stroke="#DB1A1A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="8" x2="20" y2="8" stroke="#DB1A1A" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="11" cy="8" r="2" fill="#DB1A1A" />
      <path d="M2 8 L0.5 13 Q3 15.5 5.5 13 Z" fill="none" stroke="#DB1A1A" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M20 8 L18.5 13 Q21 15.5 23.5 13 Z" fill="none" stroke="#DB1A1A" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function PillNav() {
  const { t } = useLanguage();
  const { theme, toggle: toggleTheme } = useTheme();
  const pathname = usePathname();

  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);
  const activeTweenRefs = useRef<gsap.core.Tween[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = theme === 'dark';

  const items = [
    { href: '/',        label: t.nav.home },
    { href: '/chat',    label: t.nav.chat },
    { href: '/about',   label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, i) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement;
        const { width: w, height: h } = pill.getBoundingClientRect();
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;
        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${D - delta}px` });
        const label = pill.querySelector('.pill-label');
        const hover = pill.querySelector('.pill-label-hover');
        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: h + 12, opacity: 0 });
        tlRefs.current[i]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
        if (hover) { gsap.set(hover, { y: h + 100, opacity: 0 }); tl.to(hover, { y: 0, opacity: 1, duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0); }
        tlRefs.current[i] = tl;
      });
    };
    layout();
    window.addEventListener('resize', layout);
    return () => window.removeEventListener('resize', layout);
  }, [items.length, isDark]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i]; if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease: 'power3.easeOut', overwrite: 'auto' }) as unknown as gsap.core.Tween;
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i]; if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease: 'power3.easeOut', overwrite: 'auto' }) as unknown as gsap.core.Tween;
  };

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    const lines = hamburgerRef.current?.querySelectorAll('.hamburger-line');
    const popover = popoverRef.current;
    if (lines) {
      if (next) { gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3 }); gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3 }); }
      else { gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3 }); gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3 }); }
    }
    if (popover) {
      if (next) { gsap.set(popover, { visibility: 'visible' }); gsap.fromTo(popover, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25 }); }
      else { gsap.to(popover, { opacity: 0, y: 8, duration: 0.2, onComplete: () => gsap.set(popover, { visibility: 'hidden' }) }); }
    }
  };

  const baseColor = isDark ? 'rgba(31,5,5,0.72)' : 'rgba(255,246,246,0.72)';
  const pillBg    = '#DB1A1A';
  const pillText  = '#FFFFFF';

  return (
    <>
      <div className="pill-nav-wrapper">
        <nav className="pill-nav" style={{ '--base': baseColor, '--pill-bg': pillBg, '--pill-text': pillText, '--hover-text': '#FFFFFF', '--hover-fill': 'rgba(255,255,255,0.2)' } as React.CSSProperties}>
          <Link href="/" className="pill-logo-btn" aria-label="HakiYangu Home" style={{ '--base': baseColor } as React.CSSProperties}>
            <ScalesIcon />
          </Link>

          <div className="pill-nav-items">
            <ul className="pill-list" role="menubar">
              {items.map((item, i) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    className={`pill${pathname === item.href ? ' is-active' : ''}`}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span className="hover-circle" ref={el => { circleRefs.current[i] = el; }} />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">{item.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="pill-extras" style={{ '--base': baseColor } as React.CSSProperties}>
            <LanguageToggle />
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:opacity-70"
              style={{ color: isDark ? '#D4AF37' : '#DB1A1A', background: 'transparent', border: 'none', cursor: 'pointer' }}
              aria-label="Toggle dark mode"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          <button ref={hamburgerRef} className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu" style={{ '--base': baseColor } as React.CSSProperties}>
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </nav>
      </div>

      <div ref={popoverRef} className="mobile-popover" style={{ '--base': baseColor, '--pill-bg': pillBg, '--pill-text': pillText } as React.CSSProperties}>
        <ul className="mobile-menu-list">
          {items.map(item => (
            <li key={item.href}>
              <Link href={item.href} className={`mobile-menu-link${pathname === item.href ? ' is-active' : ''}`} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

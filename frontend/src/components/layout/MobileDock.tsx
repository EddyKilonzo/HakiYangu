'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Dock from './Dock';

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function MobileDock() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggle: toggleTheme } = useTheme();
  const { language, toggle: toggleLanguage, t } = useLanguage();
  const isDark = theme === 'dark';

  const navItems = [
    {
      icon: <HomeIcon />,
      label: t.nav.home,
      onClick: () => router.push('/'),
      className: pathname === '/' ? 'active-nav' : '',
    },
    {
      icon: <ChatIcon />,
      label: t.nav.chat,
      onClick: () => router.push('/chat'),
      className: pathname === '/chat' ? 'active-nav' : '',
    },
    {
      icon: <InfoIcon />,
      label: t.nav.about,
      onClick: () => router.push('/about'),
      className: pathname === '/about' ? 'active-nav' : '',
    },
    {
      icon: <MailIcon />,
      label: t.nav.contact,
      onClick: () => router.push('/contact'),
      className: pathname === '/contact' ? 'active-nav' : '',
    },
    {
      icon: <span className="text-xs font-bold" style={{ color: 'rgba(255,246,246,0.8)', letterSpacing: '0.05em' }}>{language.toUpperCase()}</span>,
      label: language === 'en' ? 'Kiswahili' : 'English',
      onClick: toggleLanguage,
    },
    {
      icon: isDark ? <SunIcon /> : <MoonIcon />,
      label: isDark ? 'Light mode' : 'Dark mode',
      onClick: toggleTheme,
    },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <Dock
        items={navItems}
        panelHeight={62}
        baseItemSize={46}
        magnification={62}
        distance={140}
      />
    </div>
  );
}

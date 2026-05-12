'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Language } from '@/lib/types';
import { translations, Translations } from '@/lib/i18n';

interface LanguageContextValue {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hakiyangu-lang', lang);
    }
  }, []);

  const toggle = useCallback(() => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  }, [language, setLanguage]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

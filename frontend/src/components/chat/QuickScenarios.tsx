'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Scenario } from '@/lib/types';

interface QuickScenariosProps {
  scenarios: Scenario[];
  onSelect: (question: string) => void;
}

export function QuickScenarios({ scenarios, onSelect }: QuickScenariosProps) {
  const { t, language } = useLanguage();

  return (
    <div className="overflow-x-auto pb-2 custom-scrollbar">
      <div className="flex gap-2 items-center">
        <span className="flex-shrink-0 self-center text-[10px] font-bold uppercase tracking-widest opacity-40 mr-2">
          {t.chat.quickScenarios}
        </span>
        {scenarios.map((s) => {
          const title = language === 'sw' ? s.titleSw : s.titleEn;
          const question = language === 'sw' ? s.quickQuestionSw : s.quickQuestionEn;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(question)}
              className="flex-shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 border bg-surface-raised shadow-sm hover:shadow-md hover:-translate-y-0.5"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
              onMouseEnter={e => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.borderColor = 'var(--color-primary)';
                btn.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={e => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.borderColor = 'var(--color-border)';
                btn.style.color = 'var(--color-text)';
              }}
            >
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

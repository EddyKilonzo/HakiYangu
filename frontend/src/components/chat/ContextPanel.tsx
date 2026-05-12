'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Scenario } from '@/lib/types';

interface ContextPanelProps {
  detectedArea: string;
  scenarios: Scenario[];
  onSelectScenario: (question: string) => void;
}

function AreaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function ContextPanel({ detectedArea, scenarios, onSelectScenario }: ContextPanelProps) {
  const { t, language } = useLanguage();

  return (
    <aside
      className="flex h-full flex-col gap-4 p-4"
      style={{ background: 'var(--color-surface)', borderRight: '1px solid rgba(219,26,26,0.1)' }}
    >
      {detectedArea && (
        <div
          className="rounded-lg p-4"
          style={{ background: 'var(--color-surface-raised)', border: '1px solid rgba(219,26,26,0.1)' }}
        >
          <div
            className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'rgba(219,26,26,0.6)' }}
          >
            <AreaIcon />
            {t.chat.contextTitle}
          </div>
          <p className="font-semibold" style={{ color: 'var(--color-primary)' }}>{detectedArea}</p>
          <div className="mt-2 h-px" style={{ background: 'rgba(212,175,55,0.3)' }} />
        </div>
      )}

      <div>
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'rgba(219,26,26,0.6)' }}
        >
          {t.chat.quickScenarios}
        </p>
        <div className="flex flex-col gap-2">
          {scenarios.map((s) => {
            const title = language === 'sw' ? s.titleSw : s.titleEn;
            const question = language === 'sw' ? s.quickQuestionSw : s.quickQuestionEn;
            return (
              <button
                key={s.id}
                onClick={() => onSelectScenario(question)}
                className="rounded-lg px-3 py-2 text-left text-sm transition-all duration-150"
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid rgba(219,26,26,0.1)',
                  color: 'var(--color-text)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(219,26,26,0.35)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = 'var(--shadow-card)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(219,26,26,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                }}
              >
                {title}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChat } from '@/hooks/useChat';
import { MessageBubble, TypingIndicator } from './MessageBubble';
import { ContextPanel } from './ContextPanel';
import { DemandLetterModal } from './DemandLetterModal';
import { QuickScenarios } from './QuickScenarios';
import { Scenario } from '@/lib/types';
import { getScenarios } from '@/lib/api';

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );
}

function LetterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export function ChatInterface() {
  const { language, t } = useLanguage();
  const { messages, isLoading, error, detectedArea, suggestLetter, rateLimit, send, clear } = useChat(language);
  const [input, setInput] = useState(() => {
    if (typeof window === 'undefined') return '';
    try {
      return sessionStorage.getItem('hakiyangu-prefill') ?? '';
    } catch {
      return '';
    }
  });
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [letterOpen, setLetterOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getScenarios().then((d) => setScenarios(d.scenarios)).catch(() => {});
  }, []);

  useLayoutEffect(() => {
    try {
      const key = 'hakiyangu-prefill';
      const stored = sessionStorage.getItem(key);
      if (stored != null && stored !== '') {
        sessionStorage.removeItem(key);
        textareaRef.current?.focus();
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    send(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const situation = messages.find((m) => m.role === 'user')?.content ?? '';

  return (
  <div
    className="flex h-dvh w-full min-w-0 max-w-[100vw] overflow-hidden pb-[76px] pt-[max(0.5rem,env(safe-area-inset-top,0px))] md:pb-0 md:pt-16"
    style={{ background: 'var(--color-surface)' }}
  >
      <div className="hidden w-64 shrink-0 md:block overflow-y-auto custom-scrollbar" style={{ borderRight: '1px solid var(--color-border)' }}>
        <ContextPanel
          detectedArea={detectedArea}
          scenarios={scenarios}
          onSelectScenario={(q) => { setInput(q); textareaRef.current?.focus(); }}
        />
      </div>

      <div className="relative flex h-full min-w-0 flex-1 flex-col">
        <div
          className="flex min-w-0 items-center justify-between gap-2 px-3 py-3 z-10 sm:px-4"
          style={{ 
            background: 'var(--color-surface-raised)', 
            borderBottom: '1px solid var(--color-border)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}
        >
          <div className="min-w-0 shrink">
            <h1 className="font-serif text-lg font-bold truncate" style={{ color: 'var(--color-primary)' }}>HakiYangu</h1>
            <p className="truncate text-[9px] font-bold uppercase tracking-widest opacity-40">Kenya Legal Assistant</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {suggestLetter && (
              <button
                onClick={() => setLetterOpen(true)}
                className="inline-flex max-w-[42vw] items-center gap-1 rounded-lg px-2 py-1.5 text-[9px] font-bold transition-all hover:opacity-80 shadow-sm sm:max-w-none sm:gap-1.5 sm:px-3 sm:text-[10px]"
                style={{ background: 'var(--color-accent)', color: '#000' }}
              >
                <LetterIcon />
                <span className="truncate">{t.chat.generateLetter}</span>
              </button>
            )}
            <button
              onClick={clear}
              className="inline-flex max-w-[38vw] items-center gap-1 rounded-lg px-2 py-1.5 text-[9px] font-semibold transition-all hover:bg-black/5 sm:max-w-none sm:gap-1.5 sm:px-3 sm:text-[10px]"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
            >
              <TrashIcon />
              <span className="truncate">{t.chat.clear}</span>
            </button>
          </div>
        </div>

        <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 scroll-smooth custom-scrollbar bg-surface/30">
          {messages.length === 0 ? (
            <div className="mx-auto flex h-full min-w-0 w-full max-w-2xl flex-col items-center justify-start px-4 pb-8 pt-10 text-center sm:pt-14 md:justify-center md:pb-8 md:pt-0">
              <div
                className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl rotate-3 shadow-default sm:mb-6"
                style={{ background: 'var(--color-primary)', color: '#FFF6F6' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h2 className="mb-2 font-serif text-xl font-bold" style={{ color: 'var(--color-text)' }}>{t.chat.emptyTitle}</h2>
              <p className="max-w-md text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{t.chat.emptySubtitle}</p>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                {scenarios.slice(0, 4).map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      const q = language === 'sw' ? s.quickQuestionSw : s.quickQuestionEn;
                      send(q);
                    }}
                    className="p-3 rounded-xl text-left border border-border bg-surface-raised hover:border-primary/30 transition-all hover:shadow-card group"
                  >
                    <p className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-primary)' }}>{language === 'sw' ? s.titleSw : s.titleEn}</p>
                    <p className="text-xs line-clamp-1 opacity-70 group-hover:opacity-100">{language === 'sw' ? s.descriptionSw : s.descriptionEn}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto flex min-w-0 w-full max-w-3xl flex-col gap-5">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              {error && (
                <div
                  className="rounded-xl px-4 py-3 text-xs font-medium shadow-sm animate-in fade-in slide-in-from-bottom-2"
                  style={{ border: '1px solid rgba(219,26,26,0.3)', background: 'rgba(219,26,26,0.06)', color: 'var(--color-primary)' }}
                >
                  <p className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {error}
                  </p>
                </div>
              )}
              <div ref={bottomRef} className="h-2" />
            </div>
          )}
        </div>

        <div
          className="min-w-0 p-3 shadow-default z-10 md:p-4"
          style={{ background: 'var(--color-surface-raised)', borderTop: '1px solid var(--color-border)' }}
        >
          <div className="mx-auto mb-2 w-full max-w-3xl min-w-0">
            <QuickScenarios scenarios={scenarios} onSelect={(q) => { setInput(q); textareaRef.current?.focus(); }} />
          </div>
          <form onSubmit={handleSubmit} className="mx-auto flex min-w-0 max-w-3xl items-end gap-2">
            <div className="relative min-w-0 flex-1">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chat.placeholder}
                rows={1}
                className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all shadow-sm focus:shadow-md"
                style={{
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  minHeight: '44px',
                  maxHeight: '120px'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl transition-all disabled:opacity-50 hover:scale-105 active:scale-95 shadow-default"
              style={{ background: 'var(--color-primary)', color: '#FFF6F6' }}
            >
              <SendIcon />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-center gap-4">
            <p className="text-[8px] opacity-40 font-medium uppercase tracking-[0.2em]">
              Legal info only • Not legal advice
            </p>
            {rateLimit?.remaining && (
              <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)', opacity: parseInt(rateLimit.remaining) < 3 ? 1 : 0.6 }}>
                {rateLimit.remaining} {language === 'sw' ? 'ujumbe umebakia' : 'messages left'}
              </p>
            )}
          </div>
        </div>
      </div>

      <DemandLetterModal
        isOpen={letterOpen}
        onClose={() => setLetterOpen(false)}
        situation={situation}
        chatHistory={messages}
        language={language}
      />
    </div>
  );
}

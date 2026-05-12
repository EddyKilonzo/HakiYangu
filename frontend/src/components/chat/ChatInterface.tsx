'use client';

import { useState, useEffect, useRef } from 'react';
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
  const { messages, isLoading, error, detectedArea, suggestLetter, send, clear } = useChat(language);
  const [input, setInput] = useState('');
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [letterOpen, setLetterOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getScenarios().then((d) => setScenarios(d.scenarios)).catch(() => {});
  }, []);

  useEffect(() => {
    const prefill = sessionStorage.getItem('hakiyangu-prefill');
    if (prefill) {
      setInput(prefill);
      sessionStorage.removeItem('hakiyangu-prefill');
      textareaRef.current?.focus();
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
    <div className="flex h-[calc(100vh-4.5rem)] md:h-[calc(100vh-5rem)] overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      <div className="hidden w-72 md:block overflow-y-auto">
        <ContextPanel
          detectedArea={detectedArea}
          scenarios={scenarios}
          onSelectScenario={(q) => { setInput(q); textareaRef.current?.focus(); }}
        />
      </div>

      <div className="flex flex-1 flex-col relative">
        <div
          className="flex items-center justify-between px-6 py-4 z-10"
          style={{ 
            background: 'var(--color-surface-raised)', 
            borderBottom: '1px solid var(--color-border)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}
        >
          <div>
            <h1 className="font-serif text-xl font-bold" style={{ color: 'var(--color-primary)' }}>HakiYangu</h1>
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Kenya Legal Assistant</p>
          </div>
          <div className="flex items-center gap-3">
            {suggestLetter && (
              <button
                onClick={() => setLetterOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all hover:opacity-80 shadow-sm"
                style={{ background: 'var(--color-accent)', color: '#000' }}
              >
                <LetterIcon />
                {t.chat.generateLetter}
              </button>
            )}
            <button
              onClick={clear}
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all hover:bg-black/5"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
            >
              <TrashIcon />
              {t.chat.clear}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center px-4">
              <div
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl rotate-3 shadow-default"
                style={{ background: 'var(--color-primary)', color: '#FFF6F6' }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h2 className="mb-3 font-serif text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{t.chat.emptyTitle}</h2>
              <p className="max-w-md text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{t.chat.emptySubtitle}</p>
              
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {scenarios.slice(0, 4).map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      const q = language === 'sw' ? s.quickQuestionSw : s.quickQuestionEn;
                      send(q);
                    }}
                    className="p-4 rounded-xl text-left border border-border bg-surface-raised hover:border-primary/30 transition-all hover:shadow-card group"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">{language === 'sw' ? s.titleSw : s.titleEn}</p>
                    <p className="text-sm line-clamp-2 opacity-70 group-hover:opacity-100">{language === 'sw' ? s.descriptionSw : s.descriptionEn}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              {error && (
                <div
                  className="rounded-xl px-5 py-4 text-sm font-medium shadow-sm animate-in fade-in slide-in-from-bottom-2"
                  style={{ border: '1px solid rgba(219,26,26,0.3)', background: 'rgba(219,26,26,0.06)', color: 'var(--color-primary)' }}
                >
                  <p className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {error}
                  </p>
                </div>
              )}
              <div ref={bottomRef} className="h-4" />
            </div>
          )}
        </div>

        <div
          className="p-4 md:p-6 shadow-default z-10"
          style={{ background: 'var(--color-surface-raised)', borderTop: '1px solid var(--color-border)' }}
        >
          <div className="mb-4 max-w-4xl mx-auto">
            <QuickScenarios scenarios={scenarios} onSelect={(q) => { setInput(q); textareaRef.current?.focus(); }} />
          </div>
          <form onSubmit={handleSubmit} className="flex items-end gap-3 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chat.placeholder}
                rows={1}
                className="w-full resize-none rounded-2xl px-5 py-4 text-base outline-none transition-all shadow-sm focus:shadow-md"
                style={{
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  minHeight: '56px',
                  maxHeight: '200px'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-2xl transition-all disabled:opacity-50 hover:scale-105 active:scale-95 shadow-default"
              style={{ background: 'var(--color-primary)', color: '#FFF6F6' }}
            >
              <SendIcon />
            </button>
          </form>
          <p className="mt-3 text-[10px] text-center opacity-40 font-medium uppercase tracking-[0.2em]">
            HakiYangu provides legal information, not legal advice.
          </p>
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

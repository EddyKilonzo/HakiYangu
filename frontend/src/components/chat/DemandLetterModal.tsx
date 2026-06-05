'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Message, Language } from '@/lib/types';
import { generateLetter } from '@/lib/api';

interface DemandLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  situation: string;
  chatHistory: Message[];
  language: Language;
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function DemandLetterModal({ isOpen, onClose, situation, chatHistory, language }: DemandLetterModalProps) {
  const { t } = useLanguage();
  const [letterType, setLetterType] = useState<'demand' | 'complaint'>('demand');
  const [letter, setLetter] = useState('');
  const [subject, setSubject] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateLetter({ situation, chatHistory, language, letterType });
      setLetter(result.letter);
      setSubject(result.subject);
    } catch {
      setLetter(language === 'sw' ? 'Hitilafu ilitokea. Tafadhali jaribu tena.' : 'An error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([letter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject || 'letter'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-t-2xl sm:rounded-2xl"
            style={{ background: 'var(--color-surface-raised)', boxShadow: 'var(--shadow-default)' }}
          >
            <div
              className="flex items-center justify-between p-6"
              style={{ borderBottom: '1px solid rgba(219,26,26,0.1)' }}
            >
              <h2 className="font-serif text-xl font-bold" style={{ color: 'var(--color-text)' }}>{t.letter.title}</h2>
              <button
                onClick={onClose}
                className="transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-4 flex gap-2">
                {(['demand', 'complaint'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setLetterType(type)}
                    className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
                    style={
                      letterType === type
                        ? { background: 'var(--color-primary)', borderColor: 'var(--color-primary)', color: '#FFF6F6' }
                        : { background: 'transparent', borderColor: 'rgba(219,26,26,0.25)', color: 'var(--color-primary)' }
                    }
                  >
                    {type === 'demand' ? t.letter.demand : t.letter.complaint}
                  </button>
                ))}
              </div>

              {!letter ? (
                <div className="py-12 text-center">
                  <div className="mb-6 mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800" style={{ color: 'var(--color-primary)' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-bold" style={{ color: 'var(--color-text)' }}>Ready to generate</h3>
                  <p className="mb-8 text-sm max-w-xs mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                    Our AI will draft a professional letter citing the Constitution and relevant Kenyan laws based on your conversation.
                  </p>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
                    style={{ background: 'var(--color-primary)', color: '#FFF6F6', boxShadow: 'var(--shadow-default)' }}
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t.letter.generating}
                      </>
                    ) : t.letter.generate}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div 
                    className="relative overflow-hidden rounded-xl border p-8 md:p-12 shadow-inner"
                    style={{ 
                      background: 'var(--color-surface-raised)', 
                      borderColor: 'var(--color-border)',
                      fontFamily: 'var(--font-serif)',
                    }}
                  >
                    {/* Decorative Top Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: 'var(--color-primary)' }} />
                    
                    {/* Watermark/Logo Placeholder */}
                    <div className="absolute top-8 right-8 opacity-[0.03] select-none pointer-events-none">
                      <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l7 3.89v8.25l-7 3.89-7-3.89V8.07l7-3.89zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/></svg>
                    </div>

                    {subject && (
                      <div className="mb-8 border-b-2 pb-4" style={{ borderColor: 'rgba(219,26,26,0.1)' }}>
                        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-accent)' }}>Subject / Re:</p>
                        <p className="text-lg font-bold uppercase leading-tight" style={{ color: 'var(--color-text)' }}>{subject}</p>
                      </div>
                    )}

                    <pre
                      className="whitespace-pre-wrap text-sm leading-relaxed"
                      style={{ color: 'var(--color-text)', fontStyle: 'normal' }}
                    >
                      {letter}
                    </pre>
                  </div>
                  
                  <div 
                    className="rounded-xl p-4 flex gap-3 items-start" 
                    style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
                  >
                    <div className="mt-0.5" style={{ color: 'var(--color-accent)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    </div>
                    <p className="text-xs leading-relaxed italic" style={{ color: 'var(--color-text-muted)' }}>{t.letter.disclaimer}</p>
                  </div>
                </div>
              )}
            </div>

            {letter && (
              <div
                className="flex gap-3 p-6"
                style={{ borderTop: '1px solid rgba(219,26,26,0.1)' }}
              >
                <button
                  onClick={handleCopy}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  style={{ borderColor: 'rgba(219,26,26,0.25)', color: 'var(--color-primary)' }}
                >
                  <CopyIcon />
                  {copied ? t.letter.copied : t.letter.copy}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'var(--color-primary)', color: '#FFF6F6', boxShadow: 'var(--shadow-default)' }}
                >
                  <DownloadIcon />
                  {t.letter.download}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

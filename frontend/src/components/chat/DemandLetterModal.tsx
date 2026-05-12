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
                <div className="py-8 text-center">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ background: 'var(--color-primary)', color: '#FFF6F6' }}
                  >
                    {isGenerating ? t.letter.generating : t.letter.generate}
                  </button>
                </div>
              ) : (
                <div>
                  {subject && (
                    <p className="mb-3 text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>Re: {subject}</p>
                  )}
                  <pre
                    className="whitespace-pre-wrap rounded-lg p-4 text-sm leading-relaxed"
                    style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}
                  >
                    {letter}
                  </pre>
                  <p className="mt-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>{t.letter.disclaimer}</p>
                </div>
              )}
            </div>

            {letter && (
              <div
                className="flex gap-3 p-4"
                style={{ borderTop: '1px solid rgba(219,26,26,0.1)' }}
              >
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
                  style={{ borderColor: 'rgba(219,26,26,0.25)', color: 'var(--color-primary)' }}
                >
                  <CopyIcon />
                  {copied ? t.letter.copied : t.letter.copy}
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ background: 'var(--color-primary)', color: '#FFF6F6' }}
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

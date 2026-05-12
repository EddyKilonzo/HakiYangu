'use client';

import { motion } from 'framer-motion';
import { Message } from '@/lib/types';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
    >
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        {!isUser && (
          <div className="mt-1 shrink-0">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl shadow-card"
              style={{ background: 'var(--color-primary)', color: '#FFF6F6' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          {!isUser && (
            <span className="text-[10px] font-bold uppercase tracking-widest px-1" style={{ color: 'var(--color-primary)' }}>
              HakiYangu AI
            </span>
          )}
          <div
            className={`rounded-2xl px-5 py-4 text-sm leading-relaxed ${isUser ? 'rounded-tr-sm shadow-sm' : 'rounded-tl-sm shadow-card'}`}
            style={
              isUser
                ? { background: 'var(--color-primary)', color: '#FFF6F6', boxShadow: 'var(--shadow-card)' }
                : {
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }
            }
          >
            {isUser ? (
              <p className="font-medium">{message.content}</p>
            ) : (
                <div
                className="prose prose-sm max-w-none min-w-0 wrap-break-word prose-headings:font-serif prose-headings:text-primary prose-a:text-primary prose-strong:text-primary"
                style={{ color: 'var(--color-text)' } as React.CSSProperties}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
          </div>
          <span className={`text-[10px] font-medium opacity-40 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-start gap-1"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl shadow-card"
          style={{ background: 'var(--color-primary)', color: '#FFF6F6' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest px-1" style={{ color: 'var(--color-primary)' }}>
            HakiYangu AI
          </span>
          <div
            className="flex gap-1.5 rounded-2xl rounded-tl-sm px-6 py-4 shadow-card"
            style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full"
                style={{ background: 'var(--color-primary)', opacity: 0.4 }}
                animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
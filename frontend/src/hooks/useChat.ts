'use client';

import { useState, useCallback, useRef } from 'react';
import { Message, ChatResponse } from '@/lib/types';
import { sendMessage, RateLimitInfo } from '@/lib/api';
import { Language } from '@/lib/types';

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

function getSessionId(): string {
  if (typeof window === 'undefined') return generateId();
  let id = sessionStorage.getItem('hakiyangu-session');
  if (!id) {
    id = generateId();
    sessionStorage.setItem('hakiyangu-session', id);
  }
  return id;
}

export function useChat(language: Language) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedArea, setDetectedArea] = useState<string>('');
  const [suggestLetter, setSuggestLetter] = useState(false);
  const [rateLimit, setRateLimit] = useState<RateLimitInfo | null>(null);
  const sessionId = useRef(getSessionId());
  
  // Rate limiting state
  const lastMessages = useRef<number[]>([]);
  const RATE_LIMIT_COUNT = 5;
  const RATE_LIMIT_WINDOW = 60000; // 1 minute

  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      // Rate limiting check
      const now = Date.now();
      lastMessages.current = lastMessages.current.filter(t => now - t < RATE_LIMIT_WINDOW);
      
      if (lastMessages.current.length >= RATE_LIMIT_COUNT) {
        setError(language === 'sw' ? 'Tafadhali subiri kidogo kabla ya kutuma ujumbe mwingine.' : 'Please wait a moment before sending another message.');
        return;
      }

      const userMsg: Message = {
        id: generateId(),
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setError(null);
      lastMessages.current.push(now);

      try {
        const response = await sendMessage({
          message: text.trim(),
          history: messages,
          language,
          sessionId: sessionId.current,
        });

        if (response.ratelimit) {
          setRateLimit(response.ratelimit);
        }

        const assistantMsg: Message = {
          id: generateId(),
          role: 'assistant',
          content: response.reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setDetectedArea(response.detectedArea);
        setSuggestLetter(response.suggestLetter);
      } catch (err: any) {
        if (err.ratelimit) {
          setRateLimit(err.ratelimit);
        }
        setError(err.message || (language === 'sw' ? 'Kuna hitilafu. Tafadhali jaribu tena.' : 'Something went wrong. Please try again.'));
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, language],
  );

  const clear = useCallback(() => {
    setMessages([]);
    setDetectedArea('');
    setSuggestLetter(false);
    setError(null);
    lastMessages.current = [];
    sessionId.current = getSessionId();
    sessionStorage.removeItem('hakiyangu-session');
  }, []);

  return { messages, isLoading, error, detectedArea, suggestLetter, rateLimit, send, clear };
}

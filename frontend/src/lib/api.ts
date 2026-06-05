import { ChatResponse, Language, LetterResponse, Message, Scenario } from './types';

const isBrowser = typeof window !== 'undefined';
// In production on Vercel, requests to /api/* are routed to the backend service.
// On localhost, we use '/api' which is then rewritten by next.config.ts to localhost:3001.
const API_URL = process.env.NEXT_PUBLIC_API_URL || (isBrowser ? '/api' : 'http://localhost:3001');

export interface RateLimitInfo {
  limit?: string;
  remaining?: string;
  reset?: string;
}

export async function sendMessage(params: {
  message: string;
  history: Message[];
  language: Language;
  sessionId: string;
}): Promise<ChatResponse & { ratelimit?: RateLimitInfo }> {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: params.message,
      history: params.history.map((m) => ({ role: m.role, content: m.content })),
      language: params.language,
      sessionId: params.sessionId,
    }),
  });

  const ratelimit: RateLimitInfo = {
    limit: res.headers.get('x-ratelimit-limit') || undefined,
    remaining: res.headers.get('x-ratelimit-remaining') || undefined,
    reset: res.headers.get('x-ratelimit-reset') || undefined,
  };

  if (!res.ok) {
    if (res.status === 429) {
      const data = await res.json().catch(() => ({}));
      const err = new Error(data.message || 'Too many requests. Please wait a minute.');
      (err as any).ratelimit = ratelimit;
      throw err;
    }
    throw new Error(`Chat request failed: ${res.status}`);
  }
  
  const data = await res.json();
  return { ...data, ratelimit };
}

export async function generateLetter(params: {
  situation: string;
  chatHistory: Message[];
  language: Language;
  letterType: 'demand' | 'complaint';
}): Promise<LetterResponse> {
  const res = await fetch(`${API_URL}/letter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      situation: params.situation,
      chatHistory: params.chatHistory.map((m) => ({ role: m.role, content: m.content })),
      language: params.language,
      letterType: params.letterType,
    }),
  });
  if (!res.ok) {
    if (res.status === 429) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Too many requests. Please wait a minute.');
    }
    throw new Error(`Letter request failed: ${res.status}`);
  }
  return res.json();
}

export async function getScenarios(): Promise<{ scenarios: Scenario[] }> {
  const res = await fetch(`${API_URL}/scenarios`);
  if (!res.ok) throw new Error(`Scenarios request failed: ${res.status}`);
  return res.json();
}

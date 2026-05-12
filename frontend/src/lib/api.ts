import { ChatResponse, Language, LetterResponse, Message, Scenario } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function sendMessage(params: {
  message: string;
  history: Message[];
  language: Language;
  sessionId: string;
}): Promise<ChatResponse> {
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
  if (!res.ok) throw new Error(`Chat request failed: ${res.status}`);
  return res.json();
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
  if (!res.ok) throw new Error(`Letter request failed: ${res.status}`);
  return res.json();
}

export async function getScenarios(): Promise<{ scenarios: Scenario[] }> {
  const res = await fetch(`${API_URL}/scenarios`);
  if (!res.ok) throw new Error(`Scenarios request failed: ${res.status}`);
  return res.json();
}

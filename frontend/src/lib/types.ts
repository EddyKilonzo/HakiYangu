export type Language = 'en' | 'sw';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  reply: string;
  detectedArea: string;
  suggestLetter: boolean;
}

export interface LetterResponse {
  letter: string;
  subject: string;
}

export interface Scenario {
  id: string;
  icon: string;
  titleEn: string;
  titleSw: string;
  descriptionEn: string;
  descriptionSw: string;
  quickQuestionEn: string;
  quickQuestionSw: string;
  area: string;
}

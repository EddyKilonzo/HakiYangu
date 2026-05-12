import { IsString, IsArray, IsIn, IsOptional } from 'class-validator';

export class MessageDto {
  @IsString()
  role: 'user' | 'assistant';

  @IsString()
  content: string;
}

export class ChatDto {
  @IsString()
  message: string;

  @IsArray()
  @IsOptional()
  history: MessageDto[];

  @IsIn(['en', 'sw'])
  language: 'en' | 'sw';

  @IsString()
  sessionId: string;
}

export class LetterDto {
  @IsString()
  situation: string;

  @IsArray()
  @IsOptional()
  chatHistory: MessageDto[];

  @IsIn(['en', 'sw'])
  language: 'en' | 'sw';

  @IsIn(['demand', 'complaint'])
  letterType: 'demand' | 'complaint';
}

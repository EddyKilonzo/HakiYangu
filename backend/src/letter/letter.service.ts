import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { LetterDto } from '../chat/chat.dto';

@Injectable()
export class LetterService {
  private readonly client: Anthropic;

  constructor(private config: ConfigService) {
    this.client = new Anthropic({ apiKey: this.config.get('ANTHROPIC_API_KEY') });
  }

  async generateLetter(dto: LetterDto): Promise<{ letter: string; subject: string }> {
    const langInstruction =
      dto.language === 'sw'
        ? 'Write the entire letter in Swahili using formal legal Swahili.'
        : 'Write the entire letter in formal English.';

    const typeInstruction =
      dto.letterType === 'demand'
        ? 'Write a formal demand letter citing the relevant Kenyan law.'
        : 'Write a formal complaint letter to the relevant authority under Kenyan law.';

    const prompt = `Based on this situation: ${dto.situation}

${typeInstruction} ${langInstruction}

Format the letter properly with:
- Date placeholder: [DATE]
- Sender details placeholder: [YOUR NAME], [YOUR ADDRESS], [YOUR CONTACT]
- Recipient details placeholder: [RECIPIENT NAME/TITLE], [RECIPIENT ADDRESS]
- Reference to the Constitution of Kenya 2010 (relevant Articles) and specific Kenyan Acts of Parliament
- Clear statement of the grievance
- Specific demand or complaint
- Deadline for response (14 days)
- Signature block

On the very last line output exactly: SUBJECT:<brief subject line>`;

    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = (response.content[0] as Anthropic.TextBlock).text;
    const lines = raw.split('\n');
    let subject = 'Formal Letter';
    const subjectLine = lines.find((l) => l.startsWith('SUBJECT:'));
    if (subjectLine) subject = subjectLine.replace('SUBJECT:', '').trim();

    const letter = lines.filter((l) => !l.startsWith('SUBJECT:')).join('\n').trimEnd();

    return { letter, subject };
  }
}

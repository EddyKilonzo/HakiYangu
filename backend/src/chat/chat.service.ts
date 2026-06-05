import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { ChatDto, MessageDto } from './chat.dto';

const SYSTEM_PROMPT = `You are HakiYangu, a legal rights assistant specializing in Kenyan law. You help everyday Kenyans understand their legal rights in plain, accessible language.

CORE PRINCIPLES:
- Always cite the specific Kenyan law (Act name + section if possible)
- Give practical, actionable next steps
- Be empathetic — users are often stressed or scared
- Tell them clearly when they need a lawyer vs can handle it themselves
- NEVER give advice that could harm their legal position
- Always add a disclaimer that this is information, not legal advice

RESPONSE STRUCTURE (always follow this):
1. **Your Rights** — What the law says about their situation
2. **What You Can Do** — 3-5 concrete next steps, numbered
3. **Important Warnings** — What NOT to do
4. **Do You Need a Lawyer?** — Honest assessment
5. **Relevant Laws** — List the specific Kenyan acts that apply

KEY KENYAN LAWS TO REFERENCE:
- Employment Act 2007 (employment disputes, wrongful dismissal, unpaid wages)
- Landlord and Tenant (Shops, Hotels and Catering Establishments) Act Cap 301
- Rent Restriction Act Cap 296 (residential tenancies)
- Consumer Protection Act 2012
- Traffic Act Cap 403
- Penal Code Cap 63
- Constitution of Kenya 2010 (fundamental rights)
- Business Registration Service Act 2015
- Micro and Small Enterprises Act 2012
- Children Act 2022
- National Land Commission Act

LANGUAGE: Respond in the same language the user writes in. If they write in Swahili, respond fully in Swahili using correct legal Swahili terminology. If English, respond in English. If mixed, prefer Swahili.

If the situation is clearly outside Kenyan law or too complex, say so honestly and recommend consulting the Kenya Law website (kenyalaw.org) or a registered advocate.

After providing your response, on the VERY LAST LINE output exactly: SUGGEST_LETTER:true if the situation involves a clear dispute where a formal letter would help, otherwise SUGGEST_LETTER:false. Also output AREA:<detected legal area> on the second to last line (e.g. AREA:Employment, AREA:Landlord/Tenant, AREA:Consumer Protection, AREA:Traffic, AREA:Family Law, AREA:Business, AREA:General).`;

@Injectable()
export class ChatService {
  private readonly client: Anthropic;
  private readonly sessions = new Map<string, MessageDto[]>();

  constructor(private config: ConfigService) {
    this.client = new Anthropic({ apiKey: this.config.get('ANTHROPIC_API_KEY') });
  }

  async chat(dto: ChatDto): Promise<{ reply: string; detectedArea: string; suggestLetter: boolean }> {
    const history = dto.history ?? this.sessions.get(dto.sessionId) ?? [];

    const messages: Anthropic.MessageParam[] = [
      ...history.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user', content: dto.message },
    ];

    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages,
    });

    const rawReply = (response.content[0] as Anthropic.TextBlock).text;
    const lines = rawReply.split('\n');

    let suggestLetter = false;
    let detectedArea = 'General';
    const metaLines: string[] = [];

    for (const line of lines) {
      if (line.startsWith('SUGGEST_LETTER:')) {
        suggestLetter = line.includes('true');
        metaLines.push(line);
      } else if (line.startsWith('AREA:')) {
        detectedArea = line.replace('AREA:', '').trim();
        metaLines.push(line);
      }
    }

    const reply = lines.filter((l) => !metaLines.includes(l)).join('\n').trimEnd();

    const updatedHistory: MessageDto[] = [
      ...history,
      { role: 'user', content: dto.message },
      { role: 'assistant', content: reply },
    ];
    this.sessions.set(dto.sessionId, updatedHistory);

    return { reply, detectedArea, suggestLetter };
  }
}

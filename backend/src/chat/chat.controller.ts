import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from './chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  chat(@Body() dto: ChatDto) {
    return this.chatService.chat(dto);
  }

  @Get('health')
  health() {
    return { status: 'ok' };
  }
}

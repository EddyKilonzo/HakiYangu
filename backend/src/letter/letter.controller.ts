import { Body, Controller, Post } from '@nestjs/common';
import { LetterService } from './letter.service';
import { LetterDto } from '../chat/chat.dto';

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Post()
  generate(@Body() dto: LetterDto) {
    return this.letterService.generateLetter(dto);
  }
}

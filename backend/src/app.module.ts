import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { LetterModule } from './letter/letter.module';
import { ScenariosModule } from './scenarios/scenarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ChatModule,
    LetterModule,
    ScenariosModule,
  ],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

let cachedApp: NestExpressApplication;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({ origin: '*' });
    app.set('trust proxy', 1);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
    cachedApp = app;
  }
  return cachedApp;
}

export default async (req: any, res: any) => {
  const app = await bootstrap();
  const instance = app.getHttpAdapter().getInstance();
  instance(req, res);
};

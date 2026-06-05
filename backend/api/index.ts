import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';

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
  try {
    const app = await bootstrap();
    const instance = app.getHttpAdapter().getInstance();
    instance(req, res);
  } catch (err) {
    console.error('[HakiYangu] Bootstrap error:', err);
    res.status(500).json({ error: (err as Error).message });
  }
};

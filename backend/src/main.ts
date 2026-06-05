import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: '*' }); // Allow all for easier multi-service routing
  app.set('trust proxy', 1);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // Removed global prefix 'api' to work with Vercel routePrefix
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
  console.log(`HakiYangu backend running on port ${process.env.PORT ?? 3001}`);
}
bootstrap().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});

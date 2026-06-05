'use strict';
// reflect-metadata must be loaded first — NestJS decorators depend on it
require('reflect-metadata');

let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const { NestFactory } = require('@nestjs/core');
    const { ValidationPipe } = require('@nestjs/common');
    // Load from nest build output (compiled by tsc, preserves emitDecoratorMetadata)
    const { AppModule } = require('../dist/src/app.module');

    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: '*' });
    app.getHttpAdapter().getInstance().set('trust proxy', 1);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
    cachedApp = app;
  }
  return cachedApp;
}

module.exports = async (req, res) => {
  try {
    const app = await bootstrap();
    const instance = app.getHttpAdapter().getInstance();
    instance(req, res);
  } catch (err) {
    console.error('[HakiYangu] Bootstrap error:', err);
    res.status(500).json({ error: err.message });
  }
};

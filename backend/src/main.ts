import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';

const expressApp = express();

let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    await app.init();
    cachedApp = expressApp;
  }
  return cachedApp;
}

if (!process.env.VERCEL) {
  console.log("Vindo para o lugar errado")
  bootstrap().then(() => {
    const port = process.env.PORT || 3000;
    expressApp.listen(port, () => {
      console.log(`Application is running on: http://localhost:${port}`);
    });
  });
}

export default async (req, res) => {
  const app = await bootstrap();
  app(req, res);
};

module.exports = exports.default;
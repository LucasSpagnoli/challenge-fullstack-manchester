import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import cors from 'cors';

const expressApp = express();
const allowedOrigins = [
  'http://localhost:5173',
  'challenge-fullstack-manchester.vercel.app',
  'https://manchester-news-filter.vercel.app/'
]

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
  bootstrap().then(() => {
    const port = process.env.PORT || 3000;
    expressApp.listen(port, () => {
      console.log(`Application is running on: http://localhost:${port}`);
    });
  });
}

expressApp.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin não permitida'));
    }
  },
  credentials: true,
}));

export default async (req, res) => {
  const app = await bootstrap();
  app(req, res);
};

module.exports = exports.default;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
const MORGAN_LOG = process.env.MORGAN_LOG || 'dev';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(morgan(MORGAN_LOG));
  await app.listen(3000);
}
bootstrap();

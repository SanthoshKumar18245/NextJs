import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './otel-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  app.enableCors();
}
bootstrap();


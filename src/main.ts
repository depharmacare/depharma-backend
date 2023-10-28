import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {HttpExceptionFilter}  from './common/http-exception.filter'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter)
  // Bootstrap posrt 300 on listen
  await app.listen(3000);
}
bootstrap();

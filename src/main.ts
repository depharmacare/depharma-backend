import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config/dist';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http-exception.filter'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter)
  const configService = app.get(ConfigService)
  // Bootstrap posrt 300 on listen
  const port = configService.get<number>('port');
  await app.listen(port || 3000);
}
bootstrap();

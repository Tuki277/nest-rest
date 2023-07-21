import './dotenv-config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { configSwagger } from './config/api-docs.config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  if (process.env.MODE === 'DEV') {
    configSwagger(app);
  }

  app.useGlobalInterceptors(new TimeoutInterceptor());

  await app.listen(process.env.PORT);
}
bootstrap();

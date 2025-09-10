import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export function configSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'auth',
    )
    .setTitle('iKame solution team - base API NestJS')
    .setDescription('API description')
    .setContact('HuyTH', '', 'huyth@ikameglobal.com')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}

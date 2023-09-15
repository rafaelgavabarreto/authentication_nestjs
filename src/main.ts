import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.enableCors();

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Authentication example')
    .setDescription('The authentication API description')
    .setVersion('1.0')
    .addTag('authentication')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  app.use(helmet());
  // app.use(csurf());
  await app.listen(3000);
}
bootstrap();

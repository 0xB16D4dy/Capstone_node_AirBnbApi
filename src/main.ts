import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('.'));
  app.enableCors();
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('AirBnb New')
    .addBearerAuth()
    .setDescription('Api of Airbnb app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(8080);
}
bootstrap();

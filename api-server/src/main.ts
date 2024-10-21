import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET, HEAD, PATCH, POST, DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API Sistema Faq')
    .setDescription(
      'API feita para adicionar usuários, categorias, perguntas e respostas em um banco de dados destinado a um sistema de Faq.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

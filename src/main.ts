import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const swaggerConfig = new DocumentBuilder()
      .setTitle("Purrweb-test API")
      .setDescription("Application like Trello")
      .setVersion("0.0.1")
      .addBearerAuth()
      .build()
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/api/docs', app, swaggerDoc)

  await app.listen(process.env.PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api',{
    exclude: [
      'sitemap.xml',
    ]
  });
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}));
  
  app.enableCors({
    origin: ['http://localhost:4200', 'https://housecrafting.es'],
    methods: ['POST', 'GET'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
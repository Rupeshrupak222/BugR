import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Security & Request configuration
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global DTO validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Swagger OpenAPI documentation
  const config = new DocumentBuilder()
    .setTitle('Bug Refinery REST API')
    .setDescription(
      'Enterprise API for Bug Refinery platform: Industry Simulation Labs, Lead Ingestion, Supabase Storage, and Authentication',
    )
    .setVersion('1.0.0')
    .addTag('leads', 'Prospect and student lead capture with rate limiting & deduplication')
    .addTag('enquiries', 'Enterprise B2B IT project enquiries and RFP submissions')
    .addTag('auth', 'JWT authentication and user session management')
    .addTag('storage', 'Supabase object storage integration for files and resumes')
    .addTag('health', 'Health checks and runtime status')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Bug Refinery API Docs',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled Rejection: ${reason}`);
  });

  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`, err.stack);
  });

  const port = Number(process.env.PORT || 4001);
  await app.listen(port);
  logger.log(`Bug Refinery API running on http://localhost:${port}/api`);
  logger.log(`Swagger OpenAPI Documentation available at http://localhost:${port}/api/docs`);
}

bootstrap();

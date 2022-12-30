import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestLogger } from './logging/NestLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new NestLogger(),
  });
  await app.listen(3001);
}

void bootstrap();

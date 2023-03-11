import { NestFactory } from '@nestjs/core';
import { CryptosModule } from './cryptos.module';

async function bootstrap() {
  const app = await NestFactory.create(CryptosModule);
  await app.listen(3000);
}
bootstrap();

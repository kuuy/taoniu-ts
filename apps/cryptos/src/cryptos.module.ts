import { Module } from '@nestjs/common';
import { CryptosController } from './cryptos.controller';
import { CryptosService } from './cryptos.service';

@Module({
  imports: [],
  controllers: [CryptosController],
  providers: [CryptosService],
})
export class CryptosModule {}

import { Controller, Get } from '@nestjs/common';
import { CryptosService } from './cryptos.service';

@Controller()
export class CryptosController {
  constructor(private readonly cryptosService: CryptosService) {}

  @Get()
  getHello(): string {
    return this.cryptosService.getHello();
  }
}

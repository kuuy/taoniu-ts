import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptosService {
  getHello(): string {
    return 'Hello World!';
  }
}

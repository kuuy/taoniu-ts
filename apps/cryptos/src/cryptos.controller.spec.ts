import { Test, TestingModule } from '@nestjs/testing';
import { CryptosController } from './cryptos.controller';
import { CryptosService } from './cryptos.service';

describe('CryptosController', () => {
  let cryptosController: CryptosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CryptosController],
      providers: [CryptosService],
    }).compile();

    cryptosController = app.get<CryptosController>(CryptosController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cryptosController.getHello()).toBe('Hello World!');
    });
  });
});

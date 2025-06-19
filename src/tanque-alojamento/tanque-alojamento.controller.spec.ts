import { Test, TestingModule } from '@nestjs/testing';
import { TanqueAlojamentoController } from './tanque-alojamento.controller';
import { TanqueAlojamentoService } from './tanque-alojamento.service';

describe('TanqueAlojamentoController', () => {
  let controller: TanqueAlojamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TanqueAlojamentoController],
      providers: [TanqueAlojamentoService],
    }).compile();

    controller = module.get<TanqueAlojamentoController>(TanqueAlojamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

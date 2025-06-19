import { Test, TestingModule } from '@nestjs/testing';
import { TanqueAlojamentoService } from './tanque-alojamento.service';

describe('TanqueAlojamentoService', () => {
  let service: TanqueAlojamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TanqueAlojamentoService],
    }).compile();

    service = module.get<TanqueAlojamentoService>(TanqueAlojamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

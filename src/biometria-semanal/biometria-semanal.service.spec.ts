import { Test, TestingModule } from '@nestjs/testing';
import { BiometriaSemanalService } from './biometria-semanal.service';

describe('BiometriaSemanalService', () => {
  let service: BiometriaSemanalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiometriaSemanalService],
    }).compile();

    service = module.get<BiometriaSemanalService>(BiometriaSemanalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

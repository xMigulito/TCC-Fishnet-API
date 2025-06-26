import { Test, TestingModule } from '@nestjs/testing';
import { BiometriaDiariaService } from './biometria-diaria.service';

describe('BiometriaDiariaService', () => {
  let service: BiometriaDiariaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiometriaDiariaService],
    }).compile();

    service = module.get<BiometriaDiariaService>(BiometriaDiariaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

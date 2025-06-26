import { Test, TestingModule } from '@nestjs/testing';
import { BiometriaSemanalController } from './biometria-semanal.controller';
import { BiometriaSemanalService } from './biometria-semanal.service';

describe('BiometriaSemanalController', () => {
  let controller: BiometriaSemanalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiometriaSemanalController],
      providers: [BiometriaSemanalService],
    }).compile();

    controller = module.get<BiometriaSemanalController>(BiometriaSemanalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

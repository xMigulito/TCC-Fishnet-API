import { Test, TestingModule } from '@nestjs/testing';
import { BiometriaDiariaController } from './biometria-diaria.controller';
import { BiometriaDiariaService } from './biometria-diaria.service';

describe('BiometriaDiariaController', () => {
  let controller: BiometriaDiariaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiometriaDiariaController],
      providers: [BiometriaDiariaService],
    }).compile();

    controller = module.get<BiometriaDiariaController>(BiometriaDiariaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

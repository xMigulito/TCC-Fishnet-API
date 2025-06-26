import { Test, TestingModule } from '@nestjs/testing';
import { CooperativaController } from './cooperativa.controller';
import { CooperativaService } from './cooperativa.service';

describe('CooperativaController', () => {
  let controller: CooperativaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CooperativaController],
      providers: [CooperativaService],
    }).compile();

    controller = module.get<CooperativaController>(CooperativaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

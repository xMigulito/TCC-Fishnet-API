import { Test, TestingModule } from '@nestjs/testing';
import { TanqueUserController } from './tanque-user.controller';
import { TanqueUserService } from './tanque-user.service';

describe('TanqueUserController', () => {
  let controller: TanqueUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TanqueUserController],
      providers: [TanqueUserService],
    }).compile();

    controller = module.get<TanqueUserController>(TanqueUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

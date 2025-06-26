import { Test, TestingModule } from '@nestjs/testing';
import { TanqueUserService } from './tanque-user.service';

describe('TanqueUserService', () => {
  let service: TanqueUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TanqueUserService],
    }).compile();

    service = module.get<TanqueUserService>(TanqueUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

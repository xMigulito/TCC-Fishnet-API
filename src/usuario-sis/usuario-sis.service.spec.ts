import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioSisService } from './usuario-sis.service';

describe('UsuarioSisService', () => {
  let service: UsuarioSisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioSisService],
    }).compile();

    service = module.get<UsuarioSisService>(UsuarioSisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

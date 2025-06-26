import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioSisController } from './usuario-sis.controller';
import { UsuarioSisService } from './usuario-sis.service';

describe('UsuarioSisController', () => {
  let controller: UsuarioSisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioSisController],
      providers: [UsuarioSisService],
    }).compile();

    controller = module.get<UsuarioSisController>(UsuarioSisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

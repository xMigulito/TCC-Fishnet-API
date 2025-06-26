import { Module } from '@nestjs/common';
import { UsuarioSisService } from './usuario-sis.service';
import { UsuarioSisController } from './usuario-sis.controller';

@Module({
  controllers: [UsuarioSisController],
  providers: [UsuarioSisService],
})
export class UsuarioSisModule {}

import { Module } from '@nestjs/common';
import { BiometriaDiariaService } from './biometria-diaria.service';
import { BiometriaDiariaController } from './biometria-diaria.controller';

@Module({
  controllers: [BiometriaDiariaController],
  providers: [BiometriaDiariaService],
})
export class BiometriaDiariaModule {}

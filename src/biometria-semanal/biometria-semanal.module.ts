import { Module } from '@nestjs/common';
import { BiometriaSemanalService } from './biometria-semanal.service';
import { BiometriaSemanalController } from './biometria-semanal.controller';

@Module({
  controllers: [BiometriaSemanalController],
  providers: [BiometriaSemanalService],
})
export class BiometriaSemanalModule {}

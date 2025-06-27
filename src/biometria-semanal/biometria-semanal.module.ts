import { Module } from '@nestjs/common';
import { BiometriaSemanalService } from './biometria-semanal.service';
import { BiometriaSemanalController } from './biometria-semanal.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BiometriaSemanalController],
  providers: [BiometriaSemanalService, PrismaService],
})
export class BiometriaSemanalModule {}

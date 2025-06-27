import { Module } from '@nestjs/common';
import { BiometriaDiariaService } from './biometria-diaria.service';
import { BiometriaDiariaController } from './biometria-diaria.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BiometriaDiariaController],
  providers: [BiometriaDiariaService, PrismaService],
})
export class BiometriaDiariaModule {}

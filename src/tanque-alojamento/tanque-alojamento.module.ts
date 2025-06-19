import { Module } from '@nestjs/common';
import { TanqueAlojamentoService } from './tanque-alojamento.service';
import { TanqueAlojamentoController } from './tanque-alojamento.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TanqueAlojamentoController],
  providers: [TanqueAlojamentoService, PrismaService],
})
export class TanqueAlojamentoModule {}

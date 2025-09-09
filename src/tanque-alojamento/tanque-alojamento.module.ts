import { Module } from '@nestjs/common';
import { TanqueAlojamentoService } from './tanque-alojamento.service';
import { TanqueAlojamentoController } from './tanque-alojamento.controller';

@Module({
  controllers: [TanqueAlojamentoController],
  providers: [TanqueAlojamentoService],
})
export class TanqueAlojamentoModule {}

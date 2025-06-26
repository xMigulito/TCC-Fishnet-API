import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TanqueModule } from './tanque/tanque.module';
import { TanqueAlojamentoModule } from './tanque-alojamento/tanque-alojamento.module';
import { PrismaService } from './prisma.service';
import { TanqueUserModule } from './tanque-user/tanque-user.module';
import { UsuarioSisModule } from './usuario-sis/usuario-sis.module';
import { CooperativaModule } from './cooperativa/cooperativa.module';
import { BiometriaDiariaModule } from './biometria-diaria/biometria-diaria.module';
import { BiometriaSemanalModule } from './biometria-semanal/biometria-semanal.module';

@Module({
  imports: [TanqueModule, TanqueAlojamentoModule, TanqueUserModule, UsuarioSisModule, CooperativaModule, BiometriaDiariaModule, BiometriaSemanalModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

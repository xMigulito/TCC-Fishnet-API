import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TanqueModule } from './tanque/tanque.module';
import { TanqueAlojamentoModule } from './tanque-alojamento/tanque-alojamento.module';
import { PrismaModule } from './prisma/prisma.module';
import { TanqueUserModule } from './tanque-user/tanque-user.module';
import { UsuarioSisModule } from './usuario-sis/usuario-sis.module';
import { BiometriaDiariaModule } from './biometria-diaria/biometria-diaria.module';
import { BiometriaSemanalModule } from './biometria-semanal/biometria-semanal.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    TanqueModule, 
    TanqueAlojamentoModule, 
    TanqueUserModule, 
    UsuarioSisModule, 
    BiometriaDiariaModule, 
    BiometriaSemanalModule, 
    DashboardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TanqueModule } from './tanque/tanque.module';
import { TanqueAlojamentoModule } from './tanque-alojamento/tanque-alojamento.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [TanqueModule, TanqueAlojamentoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

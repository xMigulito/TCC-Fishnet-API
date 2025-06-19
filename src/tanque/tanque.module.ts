/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TanqueService } from './tanque.service';
import { TanqueController } from './tanque.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TanqueController],
  providers: [TanqueService, PrismaService],
})
export class TanqueModule {}

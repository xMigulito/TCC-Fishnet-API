/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TanqueService } from './tanque.service';
import { TanqueController } from './tanque.controller';

@Module({
  controllers: [TanqueController],
  providers: [TanqueService],
})
export class TanqueModule {}

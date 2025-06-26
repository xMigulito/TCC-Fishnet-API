import { Module } from '@nestjs/common';
import { TanqueUserService } from './tanque-user.service';
import { TanqueUserController } from './tanque-user.controller';

@Module({
  controllers: [TanqueUserController],
  providers: [TanqueUserService],
})
export class TanqueUserModule {}

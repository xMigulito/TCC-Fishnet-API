import { PartialType } from '@nestjs/mapped-types';
import { CreateTanqueUserDto } from './create-tanque-user.dto';

export class UpdateTanqueUserDto extends PartialType(CreateTanqueUserDto) {}

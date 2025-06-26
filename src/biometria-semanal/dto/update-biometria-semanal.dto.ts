import { PartialType } from '@nestjs/mapped-types';
import { CreateBiometriaSemanalDto } from './create-biometria-semanal.dto';

export class UpdateBiometriaSemanalDto extends PartialType(CreateBiometriaSemanalDto) {}

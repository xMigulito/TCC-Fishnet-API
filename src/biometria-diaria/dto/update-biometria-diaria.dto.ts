import { PartialType } from '@nestjs/mapped-types';
import { CreateBiometriaDiariaDto } from './create-biometria-diaria.dto';

export class UpdateBiometriaDiariaDto extends PartialType(CreateBiometriaDiariaDto) {}

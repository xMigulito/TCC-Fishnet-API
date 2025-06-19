import { PartialType } from '@nestjs/mapped-types';
import { CreateTanqueAlojamentoDto } from './create-tanque-alojamento.dto';

export class UpdateTanqueAlojamentoDto extends PartialType(CreateTanqueAlojamentoDto) {}

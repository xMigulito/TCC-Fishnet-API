import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioSiDto } from './create-usuario-si.dto';

export class UpdateUsuarioSiDto extends PartialType(CreateUsuarioSiDto) {}

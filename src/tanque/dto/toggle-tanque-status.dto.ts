import { IsBoolean } from 'class-validator';

export class ToggleTanqueStatusDto {
  @IsBoolean()
  Ativo: boolean;
}

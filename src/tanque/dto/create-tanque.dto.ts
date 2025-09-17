import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTanqueDto {
  @IsNumber()
  Largura: number;

  @IsString()
  Local: string;

  @IsNumber()
  Comprimento: number;

  @IsOptional()
  @IsBoolean()
  Ativo?: boolean;
}

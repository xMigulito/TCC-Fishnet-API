import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBiometriaDiariaDto {
  @IsDate()
  Data: Date;

  @IsNumber()
  Racao: number;

  @IsNumber()
  Tanque_Alojamento_Id: number;

  @IsNumber()
  Temperatura_Agua: number;

  @IsNumber()
  Ph: number;

  @IsString()
  Temperatura_Ambiente: string;

  @IsNumber()
  Oxigenacao: number;

  // Novos campos de qualidade da água
  @IsOptional()
  @IsNumber()
  Percentual_Renovacao_Agua?: number;

  @IsOptional()
  @IsNumber()
  Nitrito?: number;

  @IsOptional()
  @IsNumber()
  Amonia?: number;

  @IsOptional()
  @IsNumber()
  Transparencia?: number;

  // Campo de alimentação
  @IsOptional()
  @IsNumber()
  Quantidade_Alimentacoes?: number;
}
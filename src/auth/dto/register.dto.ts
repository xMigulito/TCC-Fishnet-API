import { IsEmail, IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  cooperativaId: number;
}

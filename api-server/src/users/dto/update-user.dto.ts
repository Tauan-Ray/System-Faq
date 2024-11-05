import {
  IsString,
  IsEmail,
  IsOptional,
  Length,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  @Length(3, 45, {
    message: 'O nome deve conter no mínimo 3 caracteres e no máximo 45',
  })
  @ApiPropertyOptional({ example: 'Luísa', description: 'Nome do usuário.' })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Insira um endereço de email válido.' })
  @ApiPropertyOptional({
    example: 'luisa@example.com',
    description: 'Email do usuário.',
  })
  email: string;
}

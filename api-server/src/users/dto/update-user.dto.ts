import { IsString, IsEmail, IsOptional, Length, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Roles } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 45)
  @ApiPropertyOptional({ example: 'Luísa', description: 'Nome do usuário.' })
  name: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    example: 'luisa@example.com',
    description: 'Email do usuário.',
  })
  email: string;

  @IsOptional()
  @Length(8, 20, {
    message: 'Sua senha deve ter no mínimo 8 caracteres e no máximo 20',
  })
  @ApiPropertyOptional({
    example: 'password123',
    description: 'Senha do usuário',
  })
  password: string;

  @IsOptional()
  @IsEnum(Roles, { message: 'O cargo deve ser ADMIN ou USER.' })
  role: Roles;
}

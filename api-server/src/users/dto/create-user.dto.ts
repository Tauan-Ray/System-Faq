import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 45)
  @ApiProperty({
    example: 'Tauan',
    description: 'Nome do usuário.',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'tauan@example.com',
    description: 'Email do usuário.',
  })
  email: string;

  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Sua senha deve ter no mínimo 8 caracteres e no máximo 20',
  })
  @ApiProperty({
    example: 'password123',
    description: 'Senha do usuário.',
  })
  password: string;

  @IsOptional()
  @IsEnum(Roles, { message: 'O cargo deve ser ADMIN ou USER.' })
  role: Roles;
}

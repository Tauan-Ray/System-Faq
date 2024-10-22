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
  @IsNotEmpty({ message: 'O nome de usuário não deve ser um espaço vazio.' })
  @IsString({ message: 'O nome de usuário deve não deve ser múmerico.' })
  @Length(3, 45, {
    message:
      'O nome de usuário deve ter no mínimo 3 caracteres e no máximo 20.',
  })
  @ApiProperty({
    example: 'Tauan',
    description: 'Nome do usuário.',
  })
  name: string;

  @IsNotEmpty({ message: 'O email não deve ser um espaço vazio.' })
  @IsEmail({}, { message: 'Insira um endereço de email válido.' })
  @ApiProperty({
    example: 'tauan@example.com',
    description: 'Email do usuário.',
  })
  email: string;

  @IsNotEmpty({ message: 'A senha não deve ser um espaço vazio.' })
  @Length(8, 20, {
    message: 'Sua senha deve ter no mínimo 8 caracteres e no máximo 20.',
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

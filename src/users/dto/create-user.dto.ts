import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
    message: 'Sua mensagem deve ter no mínimo 8 caracteres e no máximo 20',
  })
  @ApiProperty({
    example: 'password123',
    description: 'Senha do usuário.',
  })
  password: string;
}

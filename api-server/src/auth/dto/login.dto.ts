import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'O campo de email não deve ser vazio!' })
  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário.',
    example: 'email@example.com',
  })
  email: string;

  @IsNotEmpty({ message: 'O campo de senha não pode ser vazio.' })
  @Length(8, 20, {
    message: 'Sua senha deve ter no mínimo 8 caracteres e no máximo 20',
  })
  @ApiProperty({
    description: 'Senha do usuário.',
    example: 'password123',
  })
  password: string;
}

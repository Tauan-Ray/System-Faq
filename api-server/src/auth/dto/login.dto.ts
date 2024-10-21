import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário.',
    example: 'email@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'Sua senha deve ter no mínimo 8 caracteres e no máximo 20',
  })
  @ApiProperty({
    description: 'Senha do usuário.',
    example: 'password123',
  })
  password: string;
}

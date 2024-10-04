import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'A senha deve ter no minímo 8 caracteres e no máximo 20.',
  })
  password: string;
}

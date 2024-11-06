import {IsNotEmpty, Length} from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

  export class ChangePasswordDto {
    @IsNotEmpty({ message: 'Sua senha não pode ser vazia' })
    @Length(8, 20, {
        message: 'Sua senha deve ter no mínimo 8 caracteres e no máximo 20',
    })
    @ApiProperty({
        example: 'password123',
        description: 'Senha do usuário',
    })
    password: string;


    @IsNotEmpty({ message: 'Sua senha não pode ser vazia' })
    @Length(8, 20, {
        message: 'Sua senha deve ter no mínimo 8 caracteres e no máximo 20',
    })
    @ApiProperty({
        example: 'password321',
        description: 'Senha do usuário',
    })
    currentPassword: string
  }

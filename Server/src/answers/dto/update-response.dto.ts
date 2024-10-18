import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateResponseDto {
  @IsString({ message: 'A resposta não pode ser um número.' })
  @IsNotEmpty({ message: 'A resposta não pode ser uma string vazia.' })
  @Length(3, 255, { message: 'A resposta deve ter no máximo 255 caracteres' })
  @ApiProperty({
    example: 'Basta ir no endpoint de respostas para o metódo POST',
    description: 'Texto da resposta.',
  })
  response: string;
}

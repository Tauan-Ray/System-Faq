import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDto {
  @IsString({ message: 'A resposta não pode ser um número.' })
  @IsNotEmpty({ message: 'A resposta não pode ser uma string vazia.' })
  @Length(3, 300, { message: 'A resposta deve ter no máximo 300 caracteres' })
  @ApiProperty({
    example: 'Basta ir no endpoint de perguntas para o metódo POST.',
    description: 'Texto da resposta.',
  })
  response: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O id da pergunta não pode ser um campo vazio.' })
  @ApiProperty({
    example: 1,
    description: 'ID da pergunta que está sendo respondida.',
  })
  question_id: number;
}

import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @IsString({ message: 'A categoria não pode ser um número.' })
  @IsNotEmpty({ message: 'A categoria não pode ser uma string vazia.' })
  @Length(3, 100, { message: 'A pergunta deve ter no máximo 100 caracteres' })
  @ApiProperty({
    example: 'Como faço para criar uma pergunta?',
    description: 'Texto da pergunta.',
  })
  question: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O id de categoria não pode ser um campo vazio.' })
  @ApiProperty({
    example: 1,
    description: 'ID da categoria que a pergunta pertence.',
  })
  category_id: number;
}

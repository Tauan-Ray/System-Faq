import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @IsString({ message: 'A pergunta não pode ser um número.' })
  @IsNotEmpty({ message: 'A pergunta não pode ser uma string vazia.' })
  @Length(3, 60, { message: 'A pergunta deve ter no máximo 60 caracteres' })
  @ApiProperty({
    example: 'Como faço para criar uma pergunta?',
    description: 'Texto da pergunta.',
  })
  question: string;


  @IsString({ message: 'A descrição não pode ser um número.' })
  @IsNotEmpty({ message: 'A descrição não pode ser uma string vazia.' })
  @Length(3, 255, { message: 'A descrição deve ter no máximo 255 caracteres' })
  @ApiProperty({
    example: 'Queria saber como faço para criar uma outra pergunta.',
    description: 'Texto da pergunta.',
  })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O id de categoria não pode ser um campo vazio.' })
  @ApiProperty({
    example: 1,
    description: 'ID da categoria que a pergunta pertence.',
  })
  category_id: number;
}

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQuestionDto {
  @IsOptional()
  @IsString({ message: 'A categoria não pode ser um número.' })
  @IsNotEmpty({ message: 'A categoria não pode ser uma string vazia.' })
  @Length(3, 60, { message: 'A pergunta deve ter no máximo 60 caracteres' })
  @ApiPropertyOptional({
    example: 'Como faço para responder uma pergunta?',
    description: 'Texto da pergunta',
  })
  question: string;


  @IsOptional()
  @IsString({ message: 'A descrição não pode ser um número.' })
  @IsNotEmpty({ message: 'A descrição não pode ser uma string vazia.' })
  @Length(3, 255, { message: 'A descrição deve ter no máximo 255 caracteres' })
  @ApiPropertyOptional({
    example: 'Queria saber como faço para criar uma outra pergunta.',
    description: 'Texto da descrição.',
  })
  description: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty({ message: 'O id de categoria não pode ser um campo vazio.' })
  @ApiPropertyOptional({
    example: 1,
    description: 'ID da categoria que a pergunta pertence.',
  })
  category_id: number;
}

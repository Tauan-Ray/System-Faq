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
  @Length(3, 100, { message: 'A pergunta deve ter no máximo 100 caracteres' })
  @ApiPropertyOptional({
    example: 'Como faço para responder uma pergunta?',
    description: 'Texto da pergunta',
  })
  question: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty({ message: 'O id de categoria não pode ser um campo vazio.' })
  @ApiPropertyOptional({
    example: 1,
    description: 'ID da categoria que a pergunta pertence.',
  })
  category_id: number;
}

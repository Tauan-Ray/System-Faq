import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateCategoryDto {
  @IsNotEmpty({ message: 'A categoria não pode ser uma string vazia.' })
  @IsString({ message: 'A categoria não pode ser um número.' })
  @Length(3, 45, { message: 'Deve possuir no máximo 45 caracteres.' })
  @ApiProperty({ example: 'Faq Geral', description: 'Nome da categoria.' })
  category: string;
}

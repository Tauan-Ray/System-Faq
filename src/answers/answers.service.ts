import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Response } from './interface/response.interface';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}

  async getResponse(): Promise<Response[]> {
    return await this.prisma.answers.findMany();
  }

  async createResponse(
    createResponseDto: CreateResponseDto,
  ): Promise<Response> {
    try {
      const newResponse = await this.prisma.answers.create({
        data: {
          response: createResponseDto.response,
          question_id: createResponseDto.question_id,
        },
      });
      return newResponse;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new HttpException(
          'Pergunta não encontrada.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Erro ao criar uma resposta.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async updateResponse(
    id: number,
    updateResponseDto: UpdateResponseDto,
  ): Promise<Response> {
    try {
      const existingResponse = await this.prisma.questions.findUnique({
        where: { id },
      });
      if (!existingResponse) {
        throw new HttpException(
          'Resposta não encontrada.',
          HttpStatus.NOT_FOUND,
        );
      }
      const updateResponse = await this.prisma.answers.update({
        where: { id },
        data: {
          response: updateResponseDto.response,
        },
      });

      return updateResponse;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new HttpException(
          'Pergunta não encontrada',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Erro ao atualizar a resposta.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteResponse(id: number): Promise<{ message: string }> {
    const existingResponse = await this.prisma.answers.findUnique({
      where: { id },
    });
    if (!existingResponse) {
      throw new HttpException('Resposta não encontrada.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.answers.delete({
      where: { id },
    });
    return { message: 'Resposta deletada com sucesso.' };
  }
}

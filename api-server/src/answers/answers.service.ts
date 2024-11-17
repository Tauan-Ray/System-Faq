import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Response } from './interface/response.interface';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import {
  checkPermission,
  throwNotFoundError,
} from 'src/utils/check.permissions';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}

  async getResponse(): Promise<Response[]> {
    return await this.prisma.answers.findMany();
  }

  async getAnswersByQuestion(question_id: number): Promise<Response[]> {
    const answers =  await this.prisma.answers.findMany({
      where: {
        question_id: question_id
      },
      select: {
        id: true,
        response: true,
        response_date: true,
        users: {
          select: {
            name: true,
          }
        }
      }
    }).then((answers) => {
      return answers.map((response) => ({
        id: response.id,
        response: response.response,
        response_date: response.response_date,
        name: response.users.name,
      }))
    });

    return answers;
  }

  async createResponse(
    createResponseDto: CreateResponseDto,
    user_id_request: number,
  ): Promise<Response> {
    try {
      const newResponse = await this.prisma.answers.create({
        data: {
          response: createResponseDto.response,
          question_id: createResponseDto.question_id,
          user_id: user_id_request,
        },
      });
      return newResponse;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new HttpException(
          'Pergunta ou usuário não encontrados.',
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
    user_id_request: number,
  ): Promise<Response> {
    try {
      const existingResponse = await this.prisma.answers.findUnique({
        where: { id },
      });

      if (!existingResponse) {
        throwNotFoundError('Resposta');
      }

      checkPermission(user_id_request, existingResponse.user_id);

      const updateResponse = await this.prisma.answers.update({
        where: { id },
        data: {
          response: updateResponseDto.response,
        },
      });

      return updateResponse;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

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

  async deleteResponse(
    id: number,
    user_id_request: number,
  ): Promise<{ message: string }> {
    const existingResponse = await this.prisma.answers.findUnique({
      where: { id },
    });

    if (!existingResponse) {
      throwNotFoundError('Resposta');
    }

    checkPermission(user_id_request, existingResponse.user_id);

    await this.prisma.answers.delete({
      where: { id },
    });
    return { message: 'Resposta deletada com sucesso.' };
  }
}

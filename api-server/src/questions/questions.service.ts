import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Question } from './interface/question.interface';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {
  checkPermission,
  throwNotFoundError,
} from 'src/utils/check.permissions';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async getQuestions(): Promise<Question[]> {
    return await this.prisma.questions.findMany();
  }

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
    user_id_request: number,
  ): Promise<Question> {
    try {
      const newQuestion = await this.prisma.questions.create({
        data: {
          question: createQuestionDto.question,
          user_id: user_id_request,
          category_id: createQuestionDto.category_id,
        },
      });
      return newQuestion;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new HttpException(
          'Usuário ou categoria não encontrados.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Erro ao criar uma pergunta.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async updateQuestion(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
    user_id_request: number,
  ): Promise<Question> {
    try {
      const existingQuestion = await this.prisma.questions.findUnique({
        where: { id },
      });
      if (!existingQuestion) {
        throwNotFoundError('Pergunta');
      }

      checkPermission(user_id_request, existingQuestion);

      const updateQuestion = await this.prisma.questions.update({
        where: { id },
        data: {
          question: updateQuestionDto.question,
          category_id: updateQuestionDto.category_id,
        },
      });

      return updateQuestion;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error.code === 'P2003') {
        throw new HttpException(
          'Categoria não encontrada',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Erro ao atualizar a pergunta.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteQuestion(
    id: number,
    user_id_request: number,
  ): Promise<{ message: string }> {
    try {
      const existingQuestion = await this.prisma.questions.findUnique({
        where: { id },
      });
      if (!existingQuestion) {
        throwNotFoundError('Pergunta');
      }

      if (existingQuestion.user_id !== user_id_request) {
        checkPermission(user_id_request, existingQuestion);
      }

      await this.prisma.questions.delete({
        where: { id },
      });
      return { message: 'Pergunta deletada com sucesso.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error.code === 'P2003') {
        throw new HttpException(
          'Pergunta ainda possui respostas associadas.',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Erro ao atualizar a pergunta.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

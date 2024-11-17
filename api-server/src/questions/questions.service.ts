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
    const questions = await this.prisma.questions.findMany({
      select: {
        id: true,
        question: true,
        description: true,
        creation_date: true,
        category_id: true,
        users: {
          select: {
            name: true,
          },
        },
        categories: {
          select: {
            category: true,
          },
        },
      },
      orderBy: {
        creation_date: 'desc',
      }
    }).then((questions) => {
      return questions.map((question) => ({
        id: question.id,
        question: question.question,
        description: question.description,
        creation_date: question.creation_date,
        category: question.categories.category,
        category_id: question.category_id,
        name: question.users.name,
      }));
    });

    return questions;
  }


  async getQuestionsById(id: number): Promise<Question> {
    const questionUnique = await this.prisma.questions.findUnique({
      where: { id },
      select: {
        id: true,
        question: true,
        description: true,
        creation_date: true,
        users: {
          select: {
            name: true,
          },
        },
        answers: {
          select: {
            id: true,
          },
        },
        categories: {
          select: {
            category: true,
          },
        },
      },
    });

    const totalAnswers = questionUnique?.answers.length || 0;

    return {
      id: questionUnique.id,
      description: questionUnique.description,
      question: questionUnique.question,
      creation_date: questionUnique.creation_date,
      category: questionUnique.categories.category,
      name: questionUnique.users.name,
      quantity_answers: totalAnswers
    }
  }


  async getQuestionsByUserId(userId: number): Promise<Question[]> {
    const questions = await this.prisma.questions.findMany({
      where: {
        user_id: userId
      },
      select: {
        id: true,
        question: true,
        description: true,
        creation_date: true,
        category_id: true,
        users: {
          select: {
            name: true,
          },
        },
        categories: {
          select: {
            category: true,
          },
        },
      },
      orderBy: {
        creation_date: 'desc',
      }
    }).then((questions) => {
      return questions.map((question) => ({
        id: question.id,
        question: question.question,
        description: question.description,
        creation_date: question.creation_date,
        category: question.categories.category,
        category_id: question.category_id,
        name: question.users.name,
      }));
    });

    return questions;
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
          description: createQuestionDto.description,
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

      checkPermission(user_id_request, existingQuestion.user_id);

      const updateQuestion = await this.prisma.questions.update({
        where: { id },
        data: {
          question: updateQuestionDto.question,
          description: updateQuestionDto.description,
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
        throw new HttpException(
          'Você não tem permissão deletar essa pergunta.',
          HttpStatus.UNAUTHORIZED,
        );
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

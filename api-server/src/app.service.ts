import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getFaq(): Promise<any[]> {
    const allFaq = await this.prisma.questions.findMany({
      select: {
        question: true,
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
        answers: {
          select: {
            response: true,
          },
        },
      },
    });

    return allFaq.map((q) => ({
      name: q.users.name,
      question: q.question,
      category: q.categories.category,
      response: q.answers.map((answer) => answer.response),
    }));
  }
}

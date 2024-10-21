import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { PrismaService } from 'src/database/prisma.service';
import { QuestionsController } from './questions.controller';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaService],
})
export class QuestionsModule {}

import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { PrismaService } from 'src/database/prisma.service';
import { AnswersController } from './answers.controller';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService, PrismaService],
})
export class AnswersModule {}

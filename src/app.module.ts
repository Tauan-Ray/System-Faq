import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [UsersModule, CategoriesModule, QuestionsModule, AnswersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

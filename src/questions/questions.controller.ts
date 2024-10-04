import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Question } from './interface/question.interface';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonApiResponses } from 'src/common-api-responses.decorator';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsServices: QuestionsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as perguntas do banco de dados.' })
  @CommonApiResponses()
  async getQuestions(): Promise<Question[]> {
    return await this.questionsServices.getQuestions();
  }

  @Post('create-question')
  @ApiOperation({ summary: 'Cria uma nova pergunta no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Recurso criado com sucesso' })
  @CommonApiResponses()
  async createCategory(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return await this.questionsServices.createQuestion(createQuestionDto);
  }

  @Patch('update-question/:id')
  @ApiOperation({ summary: 'Atualiza uma pergunta no banco de dados.' })
  @CommonApiResponses()
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return await this.questionsServices.updateQuestion(id, updateQuestionDto);
  }

  @Delete('delete-question/:id')
  @ApiOperation({ summary: 'Apaga uma pergunta existente no banco de dados.' })
  @CommonApiResponses()
  async deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    return await this.questionsServices.deleteQuestion(id);
  }
}
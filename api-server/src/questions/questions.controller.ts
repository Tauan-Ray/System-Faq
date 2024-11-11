import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Question } from './interface/question.interface';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonApiResponses } from 'src/common-api-responses.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsServices: QuestionsService) {}

  @Get('all')
  @ApiOperation({ summary: 'Lista todas as perguntas do banco de dados.' })
  @CommonApiResponses()
  async getQuestions(): Promise<Question[]> {
    return await this.questionsServices.getQuestions();
  }

  @Get()
  @ApiOperation({ summary: 'Lista perguntas por meio do Id ou do IdUser' })
  @CommonApiResponses()
  async getQuestionsByIdOrUser(
    @Query('id') id?: string,
    @Query('userId') userId?: string
  ): Promise<Question | Question[]> {

    const Questionsid = parseInt(id, 10);
    const user_id = parseInt(userId, 10);

    if (id) {
      return this.questionsServices.getQuestionsById(Questionsid);
    } else if (userId) {
      return this.questionsServices.getQuestionsByUserId(user_id);
    } else {
      throw new Error('Você deve fornecer "ID" ou "UserId" como par')
    }
  }


  @Post('create-question')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Cria uma nova pergunta no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Recurso criado com sucesso' })
  @CommonApiResponses()
  async createCategory(
    @Body() createQuestionDto: CreateQuestionDto,
    @Request() req,
  ): Promise<Question> {
    return await this.questionsServices.createQuestion(
      createQuestionDto,
      req.user.sub,
    );
  }

  @Patch('update-question/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Atualiza uma pergunta no banco de dados.' })
  @CommonApiResponses()
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return await this.questionsServices.updateQuestion(
      id,
      updateQuestionDto,
      req.user.sub,
    );
  }

  @Delete('delete-question/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Apaga uma pergunta existente no banco de dados.' })
  @CommonApiResponses()
  async deleteQuestion(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.questionsServices.deleteQuestion(id, req.user.sub);
  }
}

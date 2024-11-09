import {
  Body,
  Controller,
  Delete,
  Post,
  Patch,
  ParseIntPipe,
  Param,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response } from './interface/response.interface';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { AnswersService } from './answers.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonApiResponses } from 'src/common-api-responses.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersServices: AnswersService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as respostas do banco de dados.' })
  @CommonApiResponses()
  async getAnswers(): Promise<Response[]> {
    return await this.answersServices.getResponse();
  }


  @Get('/:id')
  @ApiOperation({ summary: 'Lista todas as respostas de uma pergunta especifica.' })
  @CommonApiResponses()
  async getAnswersByQuestion(@Param('id', ParseIntPipe) question_id: number,): Promise<Response[]> {
    return await this.answersServices.getAnswersByQuestion(question_id);
  }


  @UseGuards(AuthGuard('jwt'))
  @Post('create-response')
  @ApiOperation({ summary: 'Cria uma nova resposta no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Recurso criado com sucesso' })
  @CommonApiResponses()
  async createResponse(
    @Body() createResponseDto: CreateResponseDto,
    @Request() req,
  ): Promise<Response> {
    return await this.answersServices.createResponse(
      createResponseDto,
      req.user.sub,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update-response/:id')
  @ApiOperation({ summary: 'Atualiza uma resposta no banco de dados.' })
  @CommonApiResponses()
  async updateResponse(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResponseDto: UpdateResponseDto,
    @Request() req,
  ): Promise<Response> {
    return await this.answersServices.updateResponse(
      id,
      updateResponseDto,
      req.user.sub,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete-response/:id')
  @ApiOperation({ summary: 'Apaga uma resposta existente no banco de dados.' })
  @CommonApiResponses()
  async deleteResponse(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.answersServices.deleteResponse(id, req.user.sub);
  }
}

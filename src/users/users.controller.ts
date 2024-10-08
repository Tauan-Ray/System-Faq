import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonApiResponses } from 'src/common-api-responses.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários do banco de dados.' })
  @CommonApiResponses()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Post('create-user')
  @ApiOperation({ summary: 'Cria um novo usuário no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Recurso criado com sucesso' })
  @CommonApiResponses()
  async createUser(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(CreateUserDto);
  }

  @Patch('update-user/:id')
  @ApiOperation({ summary: 'Atualiza um usuário no banco de dados.' })
  @CommonApiResponses()
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<User> {
    return await this.usersService.updateUser(id, UpdateUserDto, req.user.id);
  }

  @Delete('delete-user/:id')
  @ApiOperation({ summary: 'Apaga um usuário existente no banco de dados.' })
  @CommonApiResponses()
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.usersService.deleteUser(id, req.user.id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Category } from './interface/category.interface';
import { CreateUpdateCategoryDto } from './dto/create-update-categories.dto';
import { CategoriesService } from './categories.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonApiResponses } from 'src/common-api-responses.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesServices: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as categorias do banco de dados.' })
  @CommonApiResponses()
  async getCategories(): Promise<Category[]> {
    return await this.categoriesServices.getCategories();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('create-category')
  @ApiOperation({ summary: 'Cria uma nova categoria no banco de dados.' })
  @ApiResponse({ status: 201, description: 'Recurso criado com sucesso' })
  @CommonApiResponses()
  async createCategory(
    @Body() createCategoryDto: CreateUpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesServices.createCategory(createCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('update-category/:id')
  @ApiOperation({ summary: 'Atualiza uma categoria no banco de dados.' })
  @CommonApiResponses()
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesServices.updateCategory(id, updateCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('delete-category/:id')
  @ApiOperation({ summary: 'Apaga uma categoria existente no banco de dados.' })
  @CommonApiResponses()
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesServices.deleteCategory(id);
  }
}

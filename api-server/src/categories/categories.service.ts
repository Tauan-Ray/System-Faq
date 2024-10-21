import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Category } from './interface/category.interface';
import { CreateUpdateCategoryDto } from './dto/create-update-categories.dto';
import { throwNotFoundError } from 'src/utils/check.permissions';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategories(): Promise<Category[]> {
    return await this.prisma.categories.findMany();
  }

  async createCategory(
    createCategoryDto: CreateUpdateCategoryDto,
  ): Promise<Category> {
    return await this.prisma.categories.create({
      data: { category: createCategoryDto.category },
    });
  }

  async updateCategory(
    id: number,
    updateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<Category> {
    const existingCategory = await this.prisma.categories.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      throwNotFoundError('Categoria');
    }

    return await this.prisma.categories.update({
      where: { id },
      data: { category: updateCategoryDto.category },
    });
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    try {
      const existingCategory = await this.prisma.categories.findUnique({
        where: { id },
      });
      if (!existingCategory) {
        throwNotFoundError('Categoria');
      }

      await this.prisma.categories.delete({
        where: { id },
      });
      return { message: 'Categoria deletada com sucesso.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error.code === 'P2003') {
        throw new HttpException(
          'Categoria ainda possui perguntas associadas.',
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

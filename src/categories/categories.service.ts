import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Category } from './interface/category.interface';
import { CreateUpdateCategoryDto } from './dto/create-update-categories.dto';

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
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.categories.update({
      where: { id },
      data: { category: updateCategoryDto.category },
    });
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const existingCategory = await this.prisma.categories.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.categories.delete({
      where: { id },
    });
    return { message: 'Categoria deletada com sucesso.' };
  }
}

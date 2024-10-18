import { PrismaService } from 'src/database/prisma.service';
import { Category } from './interface/category.interface';
import { CreateUpdateCategoryDto } from './dto/create-update-categories.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    getCategories(): Promise<Category[]>;
    createCategory(createCategoryDto: CreateUpdateCategoryDto): Promise<Category>;
    updateCategory(id: number, updateCategoryDto: CreateUpdateCategoryDto): Promise<Category>;
    deleteCategory(id: number): Promise<{
        message: string;
    }>;
}

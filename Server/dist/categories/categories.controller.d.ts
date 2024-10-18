import { Category } from './interface/category.interface';
import { CreateUpdateCategoryDto } from './dto/create-update-categories.dto';
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesServices;
    constructor(categoriesServices: CategoriesService);
    getCategories(): Promise<Category[]>;
    createCategory(createCategoryDto: CreateUpdateCategoryDto): Promise<Category>;
    updateCategory(id: number, updateCategoryDto: CreateUpdateCategoryDto): Promise<Category>;
    deleteCategory(id: number): Promise<{
        message: string;
    }>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const check_permissions_1 = require("../utils/check.permissions");
let CategoriesService = class CategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCategories() {
        return await this.prisma.categories.findMany();
    }
    async createCategory(createCategoryDto) {
        return await this.prisma.categories.create({
            data: { category: createCategoryDto.category },
        });
    }
    async updateCategory(id, updateCategoryDto) {
        const existingCategory = await this.prisma.categories.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            (0, check_permissions_1.throwNotFoundError)('Categoria');
        }
        return await this.prisma.categories.update({
            where: { id },
            data: { category: updateCategoryDto.category },
        });
    }
    async deleteCategory(id) {
        try {
            const existingCategory = await this.prisma.categories.findUnique({
                where: { id },
            });
            if (!existingCategory) {
                (0, check_permissions_1.throwNotFoundError)('Categoria');
            }
            await this.prisma.categories.delete({
                where: { id },
            });
            return { message: 'Categoria deletada com sucesso.' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.code === 'P2003') {
                throw new common_1.HttpException('Categoria ainda possui perguntas associadas.', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Erro ao atualizar a pergunta.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map
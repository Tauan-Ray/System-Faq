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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const create_update_categories_dto_1 = require("./dto/create-update-categories.dto");
const categories_service_1 = require("./categories.service");
const swagger_1 = require("@nestjs/swagger");
const common_api_responses_decorator_1 = require("../common-api-responses.decorator");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("./guards/roles.guard");
let CategoriesController = class CategoriesController {
    constructor(categoriesServices) {
        this.categoriesServices = categoriesServices;
    }
    async getCategories() {
        return await this.categoriesServices.getCategories();
    }
    async createCategory(createCategoryDto) {
        return await this.categoriesServices.createCategory(createCategoryDto);
    }
    async updateCategory(id, updateCategoryDto) {
        return await this.categoriesServices.updateCategory(id, updateCategoryDto);
    }
    async deleteCategory(id) {
        return await this.categoriesServices.deleteCategory(id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas as categorias do banco de dados.' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('create-category'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria uma nova categoria no banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Recurso criado com sucesso' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_update_categories_dto_1.CreateUpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Patch)('update-category/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza uma categoria no banco de dados.' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_update_categories_dto_1.CreateUpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('delete-category/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Apaga uma categoria existente no banco de dados.' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteCategory", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('categories'),
    (0, common_1.Controller)('categories'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map
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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const create_question_dto_1 = require("./dto/create-question.dto");
const update_question_dto_1 = require("./dto/update-question.dto");
const questions_service_1 = require("./questions.service");
const swagger_1 = require("@nestjs/swagger");
const common_api_responses_decorator_1 = require("../common-api-responses.decorator");
const passport_1 = require("@nestjs/passport");
let QuestionsController = class QuestionsController {
    constructor(questionsServices) {
        this.questionsServices = questionsServices;
    }
    async getQuestions() {
        return await this.questionsServices.getQuestions();
    }
    async createCategory(createQuestionDto, req) {
        return await this.questionsServices.createQuestion(createQuestionDto, req.user.sub);
    }
    async updateCategory(id, req, updateQuestionDto) {
        return await this.questionsServices.updateQuestion(id, updateQuestionDto, req.user.sub);
    }
    async deleteQuestion(id, req) {
        return await this.questionsServices.deleteQuestion(id, req.user.sub);
    }
};
exports.QuestionsController = QuestionsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas as perguntas do banco de dados.' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "getQuestions", null);
__decorate([
    (0, common_1.Post)('create-question'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria uma nova pergunta no banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Recurso criado com sucesso' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Patch)('update-question/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza uma pergunta no banco de dados.' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, update_question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('delete-question/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Apaga uma pergunta existente no banco de dados.' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "deleteQuestion", null);
exports.QuestionsController = QuestionsController = __decorate([
    (0, swagger_1.ApiTags)('questions'),
    (0, common_1.Controller)('questions'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
//# sourceMappingURL=questions.controller.js.map
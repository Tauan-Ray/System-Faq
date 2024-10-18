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
exports.AnswersController = void 0;
const common_1 = require("@nestjs/common");
const create_response_dto_1 = require("./dto/create-response.dto");
const update_response_dto_1 = require("./dto/update-response.dto");
const answers_service_1 = require("./answers.service");
const swagger_1 = require("@nestjs/swagger");
const common_api_responses_decorator_1 = require("../common-api-responses.decorator");
const passport_1 = require("@nestjs/passport");
let AnswersController = class AnswersController {
    constructor(answersServices) {
        this.answersServices = answersServices;
    }
    async getQuestions() {
        return await this.answersServices.getResponse();
    }
    async createCategory(createResponseDto, req) {
        return await this.answersServices.createResponse(createResponseDto, req.user.sub);
    }
    async updateCategory(id, updateResponseDto, req) {
        return await this.answersServices.updateResponse(id, updateResponseDto, req.user.sub);
    }
    async deleteResponse(id, req) {
        return await this.answersServices.deleteResponse(id, req.user.sub);
    }
};
exports.AnswersController = AnswersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas as respostas do banco de dados.' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "getQuestions", null);
__decorate([
    (0, common_1.Post)('create-response'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria uma nova resposta no banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Recurso criado com sucesso' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_response_dto_1.CreateResponseDto, Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Patch)('update-response/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza uma resposta no banco de dados.' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_response_dto_1.UpdateResponseDto, Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('delete-response/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Apaga uma resposta existente no banco de dados.' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AnswersController.prototype, "deleteResponse", null);
exports.AnswersController = AnswersController = __decorate([
    (0, swagger_1.ApiTags)('answers'),
    (0, common_1.Controller)('answers'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [answers_service_1.AnswersService])
], AnswersController);
//# sourceMappingURL=answers.controller.js.map
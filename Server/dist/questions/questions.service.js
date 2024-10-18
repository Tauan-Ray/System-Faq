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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const check_permissions_1 = require("../utils/check.permissions");
let QuestionsService = class QuestionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getQuestions() {
        return await this.prisma.questions.findMany();
    }
    async createQuestion(createQuestionDto, user_id_request) {
        try {
            const newQuestion = await this.prisma.questions.create({
                data: {
                    question: createQuestionDto.question,
                    user_id: user_id_request,
                    category_id: createQuestionDto.category_id,
                },
            });
            return newQuestion;
        }
        catch (error) {
            if (error.code === 'P2003') {
                throw new common_1.HttpException('Usuário ou categoria não encontrados.', common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException('Erro ao criar uma pergunta.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async updateQuestion(id, updateQuestionDto, user_id_request) {
        try {
            const existingQuestion = await this.prisma.questions.findUnique({
                where: { id },
            });
            if (!existingQuestion) {
                (0, check_permissions_1.throwNotFoundError)('Pergunta');
            }
            (0, check_permissions_1.checkPermission)(user_id_request, existingQuestion);
            const updateQuestion = await this.prisma.questions.update({
                where: { id },
                data: {
                    question: updateQuestionDto.question,
                    category_id: updateQuestionDto.category_id,
                },
            });
            return updateQuestion;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.code === 'P2003') {
                throw new common_1.HttpException('Categoria não encontrada', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Erro ao atualizar a pergunta.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteQuestion(id, user_id_request) {
        try {
            const existingQuestion = await this.prisma.questions.findUnique({
                where: { id },
            });
            if (!existingQuestion) {
                (0, check_permissions_1.throwNotFoundError)('Pergunta');
            }
            if (existingQuestion.user_id !== user_id_request) {
                (0, check_permissions_1.checkPermission)(user_id_request, existingQuestion);
            }
            await this.prisma.questions.delete({
                where: { id },
            });
            return { message: 'Pergunta deletada com sucesso.' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.code === 'P2003') {
                throw new common_1.HttpException('Pergunta ainda possui respostas associadas.', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Erro ao atualizar a pergunta.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map
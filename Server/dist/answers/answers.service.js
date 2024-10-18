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
exports.AnswersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const check_permissions_1 = require("../utils/check.permissions");
let AnswersService = class AnswersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getResponse() {
        return await this.prisma.answers.findMany();
    }
    async createResponse(createResponseDto, user_id_request) {
        try {
            const newResponse = await this.prisma.answers.create({
                data: {
                    response: createResponseDto.response,
                    question_id: createResponseDto.question_id,
                    user_id: user_id_request,
                },
            });
            return newResponse;
        }
        catch (error) {
            if (error.code === 'P2003') {
                throw new common_1.HttpException('Pergunta ou usuário não encontrados.', common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException('Erro ao criar uma resposta.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async updateResponse(id, updateResponseDto, user_id_request) {
        try {
            const existingResponse = await this.prisma.answers.findUnique({
                where: { id },
            });
            if (!existingResponse) {
                (0, check_permissions_1.throwNotFoundError)('Resposta');
            }
            (0, check_permissions_1.checkPermission)(user_id_request, existingResponse);
            const updateResponse = await this.prisma.answers.update({
                where: { id },
                data: {
                    response: updateResponseDto.response,
                },
            });
            return updateResponse;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.code === 'P2003') {
                throw new common_1.HttpException('Pergunta não encontrada', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Erro ao atualizar a resposta.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteResponse(id, user_id_request) {
        const existingResponse = await this.prisma.answers.findUnique({
            where: { id },
        });
        if (!existingResponse) {
            (0, check_permissions_1.throwNotFoundError)('Resposta');
        }
        (0, check_permissions_1.checkPermission)(user_id_request, existingResponse);
        await this.prisma.answers.delete({
            where: { id },
        });
        return { message: 'Resposta deletada com sucesso.' };
    }
};
exports.AnswersService = AnswersService;
exports.AnswersService = AnswersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnswersService);
//# sourceMappingURL=answers.service.js.map
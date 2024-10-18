"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonApiResponses = CommonApiResponses;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function CommonApiResponses() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiResponse)({ status: 200, description: 'Recurso processado com sucesso' }), (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Recurso processado com sucesso, sem conteúdo a ser exibido',
    }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Requisição inválida' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Proibido' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Recurso não encontrado' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno no servidor' }));
}
//# sourceMappingURL=common-api-responses.decorator.js.map
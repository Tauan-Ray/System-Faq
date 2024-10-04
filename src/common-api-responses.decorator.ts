import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function CommonApiResponses() {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'Recurso processado com sucesso' }),
    ApiResponse({
      status: 204,
      description: 'Recurso processado com sucesso, sem conteúdo a ser exibido',
    }),
    ApiResponse({ status: 400, description: 'Requisição inválida' }),
    ApiResponse({ status: 403, description: 'Proibido' }),
    ApiResponse({ status: 404, description: 'Recurso não encontrado' }),
    ApiResponse({ status: 500, description: 'Erro interno no servidor' }),
  );
}

import { HttpException, HttpStatus } from '@nestjs/common';

export const checkPermission = (user_id_request: number, existingRegister) => {
  if (existingRegister.id !== user_id_request) {
    throw new HttpException(
      'Você não tem permissão para modificar este usuário.',
      HttpStatus.UNAUTHORIZED,
    );
  }
};

export const throwNotFoundError = (table: string) => {
  throw new HttpException(table + ' não encontrado(a).', HttpStatus.NOT_FOUND);
};

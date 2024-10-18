"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwNotFoundError = exports.checkPermission = void 0;
const common_1 = require("@nestjs/common");
const checkPermission = (user_id_request, existingRegister) => {
    if (existingRegister.id !== user_id_request) {
        throw new common_1.HttpException('Você não tem permissão para modificar este usuário.', common_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.checkPermission = checkPermission;
const throwNotFoundError = (table) => {
    throw new common_1.HttpException(table + ' não encontrado(a).', common_1.HttpStatus.NOT_FOUND);
};
exports.throwNotFoundError = throwNotFoundError;
//# sourceMappingURL=check.permissions.js.map
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
exports.UpdateQuestionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateQuestionDto {
}
exports.UpdateQuestionDto = UpdateQuestionDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A categoria não pode ser um número.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A categoria não pode ser uma string vazia.' }),
    (0, class_validator_1.Length)(3, 100, { message: 'A pergunta deve ter no máximo 100 caracteres' }),
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Como faço para responder uma pergunta?',
        description: 'Texto da pergunta',
    }),
    __metadata("design:type", String)
], UpdateQuestionDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O id de categoria não pode ser um campo vazio.' }),
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'ID da categoria que a pergunta pertence.',
    }),
    __metadata("design:type", Number)
], UpdateQuestionDto.prototype, "category_id", void 0);
//# sourceMappingURL=update-question.dto.js.map
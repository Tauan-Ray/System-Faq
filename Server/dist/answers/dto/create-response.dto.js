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
exports.CreateResponseDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateResponseDto {
}
exports.CreateResponseDto = CreateResponseDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'A resposta não pode ser um número.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A resposta não pode ser uma string vazia.' }),
    (0, class_validator_1.Length)(3, 300, { message: 'A resposta deve ter no máximo 300 caracteres' }),
    (0, swagger_1.ApiProperty)({
        example: 'Basta ir no endpoint de perguntas para o metódo POST.',
        description: 'Texto da resposta.',
    }),
    __metadata("design:type", String)
], CreateResponseDto.prototype, "response", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O id da pergunta não pode ser um campo vazio.' }),
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID da pergunta que está sendo respondida.',
    }),
    __metadata("design:type", Number)
], CreateResponseDto.prototype, "question_id", void 0);
//# sourceMappingURL=create-response.dto.js.map
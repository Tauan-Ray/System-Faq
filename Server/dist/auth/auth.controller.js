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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const refresh_dto_1 = require("./dto/refresh.dto");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("./dto/login.dto");
const common_api_responses_decorator_1 = require("../common-api-responses.decorator");
const create_user_dto_1 = require("../users/dto/create-user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async loginAuth(loginDto, req) {
        return await this.authService.login(loginDto, req.user.id);
    }
    async registerAuth(createUserDto) {
        return await this.authService.register(createUserDto);
    }
    async refresh(refreshTokenDto) {
        const { refresh_token } = refreshTokenDto;
        return this.authService.refreshToken(refresh_token);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login/'),
    (0, swagger_1.ApiOperation)({ summary: 'Faz login no sistema com base no email e senha.' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAuth", null);
__decorate([
    (0, common_1.Post)('register/'),
    (0, swagger_1.ApiOperation)({ summary: 'Faz login no sistema com base no email e senha.' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAuth", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiOperation)({ summary: 'Gera um novo token de refresh.' }),
    (0, common_api_responses_decorator_1.CommonApiResponses)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
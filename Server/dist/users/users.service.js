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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const bcrypt = require("bcrypt");
const client_1 = require("@prisma/client");
const check_permissions_1 = require("../utils/check.permissions");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers() {
        return await this.prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
    }
    async createUser(createUserDto) {
        const existingUser = await this.prisma.users.findUnique({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.HttpException('Email já registrado no sistema.', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return await this.prisma.users.create({
            data: {
                name: createUserDto.name,
                email: createUserDto.email,
                password: hashedPassword,
                role: createUserDto.role || client_1.Roles.USER,
            },
        });
    }
    async updateUser(id, updateUserDto, user_id_request) {
        const { email } = updateUserDto;
        const existingUser = await this.prisma.users.findUnique({ where: { id } });
        if (!existingUser) {
            (0, check_permissions_1.throwNotFoundError)('Usuário');
        }
        if (email) {
            const existingEmailUser = await this.prisma.users.findUnique({
                where: { email },
            });
            if (existingEmailUser && existingEmailUser.id !== id) {
                throw new common_1.HttpException('Email já registrado no sistema.', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        (0, check_permissions_1.checkPermission)(user_id_request, existingUser);
        let password = updateUserDto.password;
        const role = updateUserDto.role;
        if (password) {
            password = await bcrypt.hash(password, 10);
        }
        return await this.prisma.users.update({
            where: { id },
            data: {
                name: updateUserDto.name,
                email: updateUserDto.email,
                password: password || existingUser.password,
                role: role ?? existingUser.role,
            },
        });
    }
    async deleteUser(id, user_id_request) {
        const existingUser = await this.prisma.users.findUnique({
            where: { id },
        });
        if (!existingUser) {
            (0, check_permissions_1.throwNotFoundError)('Usuário');
        }
        (0, check_permissions_1.checkPermission)(user_id_request, existingUser);
        await this.prisma.users.delete({
            where: { id },
        });
        return { message: 'Usuário deletado com sucesso' };
    }
    async findOne(email) {
        const existingUser = await this.prisma.users.findUnique({
            where: { email },
        });
        if (!existingUser) {
            throw new common_1.UnauthorizedException('Email e/ou senha inválidos.');
        }
        return existingUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map
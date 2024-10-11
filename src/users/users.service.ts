import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Roles } from '@prisma/client';
import {
  checkPermission,
  throwNotFoundError,
} from 'src/utils/check.permissions';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return await this.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new HttpException(
        'Email já registrado no sistema.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return await this.prisma.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role || Roles.USER,
      },
    });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    user_id_request: number,
  ): Promise<User> {
    const { email } = updateUserDto;

    const existingUser = await this.prisma.users.findUnique({ where: { id } });

    if (!existingUser) {
      throwNotFoundError('Usuário');
    }

    if (email) {
      const existingEmailUser = await this.prisma.users.findUnique({
        where: { email },
      });
      if (existingEmailUser && existingEmailUser.id !== id) {
        throw new HttpException(
          'Email já registrado no sistema.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    checkPermission(user_id_request, existingUser);

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

  async deleteUser(
    id: number,
    user_id_request: number,
  ): Promise<{ message: string }> {
    const existingUser = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throwNotFoundError('Usuário');
    }

    checkPermission(user_id_request, existingUser);

    await this.prisma.users.delete({
      where: { id },
    });
    return { message: 'Usuário deletado com sucesso' };
  }

  async findOne(email: string) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email },
    });
    if (!existingUser) {
      throw new UnauthorizedException('Email e/ou senha inválidos.');
    }

    return existingUser;
  }
}

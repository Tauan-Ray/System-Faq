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
    const existingUser = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    if (existingUser.id !== user_id_request) {
      throw new HttpException(
        'Você não é esse usuário.',
        HttpStatus.UNAUTHORIZED,
      );
    }

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
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    if (existingUser.id !== user_id_request) {
      throw new HttpException(
        'Você não é esse usuário.',
        HttpStatus.UNAUTHORIZED,
      );
    }

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

    return await this.prisma.users.findUnique({
      where: { email },
    });
  }
}

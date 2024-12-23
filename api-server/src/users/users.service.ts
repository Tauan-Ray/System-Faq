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
import { ChangePasswordDto } from './dto/change-password.dto';

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

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const { email, id } = updateUserDto;

    if (email) {
      const existingUser = await this.prisma.users.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new HttpException(
          'Email já registrado no sistema.',
          HttpStatus.BAD_REQUEST,
        );
      }

      checkPermission(id, existingUser.id);
    }



    return await this.prisma.users.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
      },
    });
  }


  async changePassword(changePasswordDto: ChangePasswordDto, id: number): Promise<User> {
    const { currentPassword, password } = changePasswordDto;

    const existingUser = await this.prisma.users.findUnique({
      where: { id },
    });

    checkPermission(id, existingUser.id);

    const isPasswordValid = await bcrypt.compare(currentPassword, existingUser.password)

    if (!isPasswordValid) {
      throw new HttpException(
        'Senha atual incorreta.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prisma.users.update({
      where: { id },
      data: {
        password: hashedPassword,
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

    checkPermission(user_id_request, existingUser.id);

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

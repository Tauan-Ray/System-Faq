import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return await this.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
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
      },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    let password = updateUserDto.password;

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    return await this.prisma.users.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: password || existingUser.password,
      },
    });
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const existingUser = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.users.delete({
      where: { id },
    });
    return { message: 'Usuário deletado com sucesso' };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    throw new HttpException('Credenciais inválidas.', HttpStatus.UNAUTHORIZED);
  }
}

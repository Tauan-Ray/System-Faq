import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return await this.prisma.users.findMany();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
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

    return await this.prisma.users.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.password,
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
}

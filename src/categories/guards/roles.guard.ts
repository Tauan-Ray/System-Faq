import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Token não encontrado');
    }

    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });

    const user = await this.usersService.findOne(payload.email);
    if (!user || user.role !== Roles.ADMIN) {
      throw new ForbiddenException('Acesso negado!');
    }

    return true;
  }
}

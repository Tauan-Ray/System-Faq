import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CommonApiResponses } from 'src/common-api-responses.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login/')
  @ApiOperation({ summary: 'Faz login no sistema com base no email e senha.' })
  @CommonApiResponses()
  async loginAuth(@Body() loginDto: LoginDto, @Request() req) {
    return await this.authService.login(loginDto, req.user.id);
  }

  @Post('register/')
  @ApiOperation({ summary: 'Faz login no sistema com base no email e senha.' })
  @CommonApiResponses()
  async registerAuth(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Gera um novo token de refresh.' })
  @CommonApiResponses()
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    const { refresh_token } = refreshTokenDto;
    return this.authService.refreshToken(refresh_token);
  }
}

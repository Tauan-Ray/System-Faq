import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginAuth(loginDto: LoginDto, req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    registerAuth(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
        access_token: string;
    }>;
}

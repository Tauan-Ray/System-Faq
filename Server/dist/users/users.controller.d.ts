import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<User[]>;
    createUser(CreateUserDto: CreateUserDto): Promise<User>;
    updateUser(id: number, UpdateUserDto: UpdateUserDto, req: any): Promise<User>;
    deleteUser(id: number, req: any): Promise<{
        message: string;
    }>;
}

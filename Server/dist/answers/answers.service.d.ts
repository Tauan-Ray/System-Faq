import { PrismaService } from 'src/database/prisma.service';
import { Response } from './interface/response.interface';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
export declare class AnswersService {
    private prisma;
    constructor(prisma: PrismaService);
    getResponse(): Promise<Response[]>;
    createResponse(createResponseDto: CreateResponseDto, user_id_request: number): Promise<Response>;
    updateResponse(id: number, updateResponseDto: UpdateResponseDto, user_id_request: number): Promise<Response>;
    deleteResponse(id: number, user_id_request: number): Promise<{
        message: string;
    }>;
}

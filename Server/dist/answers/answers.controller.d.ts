import { Response } from './interface/response.interface';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { AnswersService } from './answers.service';
export declare class AnswersController {
    private readonly answersServices;
    constructor(answersServices: AnswersService);
    getQuestions(): Promise<Response[]>;
    createCategory(createResponseDto: CreateResponseDto, req: any): Promise<Response>;
    updateCategory(id: number, updateResponseDto: UpdateResponseDto, req: any): Promise<Response>;
    deleteResponse(id: number, req: any): Promise<{
        message: string;
    }>;
}

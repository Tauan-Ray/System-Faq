import { PrismaService } from 'src/database/prisma.service';
import { Question } from './interface/question.interface';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaService);
    getQuestions(): Promise<Question[]>;
    createQuestion(createQuestionDto: CreateQuestionDto, user_id_request: number): Promise<Question>;
    updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto, user_id_request: number): Promise<Question>;
    deleteQuestion(id: number, user_id_request: number): Promise<{
        message: string;
    }>;
}

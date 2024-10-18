import { Question } from './interface/question.interface';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';
export declare class QuestionsController {
    private readonly questionsServices;
    constructor(questionsServices: QuestionsService);
    getQuestions(): Promise<Question[]>;
    createCategory(createQuestionDto: CreateQuestionDto, req: any): Promise<Question>;
    updateCategory(id: number, req: any, updateQuestionDto: UpdateQuestionDto): Promise<Question>;
    deleteQuestion(id: number, req: any): Promise<{
        message: string;
    }>;
}

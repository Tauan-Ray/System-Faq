export interface infosQuestions {
    id: number;
    question: string;
    category: string;
    description: string;
    creation_date: string;
    name: string;
    canClick: boolean;
    quantity_answers?: number;
}
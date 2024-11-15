export interface infosQuestions {
    id: number;
    question: string;
    category: string;
    category_id: number
    description: string;
    creation_date: string;
    name: string;
    see: boolean;
    quantity_answers?: number;
}
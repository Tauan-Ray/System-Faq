export interface Question {
  id: number,
  question: string;
  description: string;
  user_id?: number;
  category_id?: number;
  creation_date: Date;
  name?: string,
  category?: string
}

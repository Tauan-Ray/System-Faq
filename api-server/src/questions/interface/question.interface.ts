export interface Question {
  id: number,
  question: string;
  user_id?: number;
  category_id?: number;
  creation_date: Date;
}

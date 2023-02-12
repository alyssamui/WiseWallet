import { Category } from "./category";

export interface Expense {
  id: number;
  title: string;
  category: Category;
  amount: number;
  createdAt?: Date;
}

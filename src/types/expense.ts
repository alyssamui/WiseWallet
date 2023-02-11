import { Category } from "./category";

export interface Expense {
  title: string;
  category: Category;
  amount: number;
  createdAt?: Date;
}

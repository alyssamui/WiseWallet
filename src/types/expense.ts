import { PayType } from "./payType";

export interface Expense {
  title: string;
  type: string;
  amount: number;
  createdAt?: string;
}

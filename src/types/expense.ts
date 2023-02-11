import { PayType } from "./payType";

export interface Expense {
  title: string;
  description?: string;
  type: PayType;
  amount: number;
  createdAt?: Date;
}

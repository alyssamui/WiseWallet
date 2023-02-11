import { PayType } from "./payType";

export interface Income {
  title: string;
  description?: string;
  type: PayType;
  amount: number;
  createdAt?: Date;
}

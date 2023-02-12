import { PayType } from "./payType";

export interface Income {
  id: number;
  title: string;
  description?: string;
  type: PayType;
  amount: number;
  createdAt?: Date;
}

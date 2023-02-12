import { PayType } from "./payType";

export interface Income {
  id: number;
  title: string;
  type: PayType;
  amount: number;
  createdAt: Date;
}

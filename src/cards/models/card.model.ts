import { Document } from 'mongoose';

export interface Card extends Document {
  userId: string;
  cardNumber: string;
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  type: string;
  amount: number;
  timestamp?: Date;
}

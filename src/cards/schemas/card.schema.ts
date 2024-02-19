import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cardNumber: { type: String, required: true },
  balance: { type: Number, default: 0 },
  transactions: [
    {
      type: { type: String, required: true },
      amount: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

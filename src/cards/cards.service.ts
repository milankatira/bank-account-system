import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from './models/card.model';

@Injectable()
export class CardsService {
  constructor(@InjectModel('Card') private readonly cardModel: Model<Card>) {}

  async findByUserId(userId: string): Promise<Card[]> {
    return this.cardModel.find({ userId }).exec();
  }

  async addCard(userId: string, cardNumber: string): Promise<Card> {
    const newCard = new this.cardModel({ userId, cardNumber });
    return newCard.save();
  }

  async runTransaction(
    userId: string,
    cardNumber: string,
    transactionType: string,
    amount: number,
  ): Promise<Card> {
    const card = await this.cardModel.findOne({ userId, cardNumber }).exec();
    if (!card) {
      throw new Error('Card not found');
    }

    if (transactionType === 'debit' && amount > card.balance) {
      throw new Error('Insufficient funds');
    }

    const newTransaction = { type: transactionType, amount };
    card.transactions.push(newTransaction);
    if (transactionType === 'debit') {
      card.balance -= amount;
    } else {
      card.balance += amount;
    }

    await card.save();
    return card;
  }

  async getTransactionHistory(
    userId: string,
    cardNumber: string,
  ): Promise<any[]> {
    const card = await this.cardModel.findOne({ userId, cardNumber }).exec();
    if (!card) {
      throw new Error('Card not found');
    }

    return card.transactions;
  }

  async getCardBalance(userId: string, cardNumber: string): Promise<number> {
    const card = await this.cardModel.findOne({ userId, cardNumber }).exec();
    if (!card) {
      throw new Error('Card not found');
    }

    return card.balance;
  }

  async getCardDetails(userId: string, cardNumber: string): Promise<Card> {
    return this.cardModel.findOne({ userId, cardNumber }).exec();
  }
}

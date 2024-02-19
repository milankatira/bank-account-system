import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './models/card.model';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get(':userId')
  async getCards(@Param('userId') userId: string): Promise<Card[]> {
    return this.cardsService.findByUserId(userId);
  }

  @Post('card')
  async addCard(
    @Body('userId') userId: string,
    @Body('cardNumber') cardNumber: string,
  ): Promise<Card> {
    return this.cardsService.addCard(userId, cardNumber);
  }

  @Post('transaction')
  async runTransaction(
    @Body('userId') userId: string,
    @Body('cardNumber') cardNumber: string,
    @Body('transactionType') transactionType: string,
    @Body('amount') amount: number,
  ): Promise<Card> {
    try {
      return await this.cardsService.runTransaction(
        userId,
        cardNumber,
        transactionType,
        amount,
      );
    } catch (error) {
      if (error.message === 'Card not found') {
        throw new NotFoundException('Card not found');
      } else if (error.message === 'Insufficient funds') {
        throw new BadRequestException('Insufficient funds');
      }
      throw error;
    }
  }

  @Get('history/:userId/:cardNumber')
  async getTransactionHistory(
    @Param('userId') userId: string,
    @Param('cardNumber') cardNumber: string,
  ): Promise<any[]> {
    return this.cardsService.getTransactionHistory(userId, cardNumber);
  }

  @Get('balance/:userId/:cardNumber')
  async getCardBalance(
    @Param('userId') userId: string,
    @Param('cardNumber') cardNumber: string,
  ): Promise<number> {
    try {
      return await this.cardsService.getCardBalance(userId, cardNumber);
    } catch (error) {
      if (error.message === 'Card not found') {
        throw new NotFoundException('Card not found');
      }
      throw error;
    }
  }

  @Get(':userId/:cardNumber')
  async getCardDetails(
    @Param('userId') userId: string,
    @Param('cardNumber') cardNumber: string,
  ): Promise<Card> {
    try {
      return await this.cardsService.getCardDetails(userId, cardNumber);
    } catch (error) {
      if (error.message === 'Card not found') {
        throw new NotFoundException('Card not found');
      }
      throw error;
    }
  }
}

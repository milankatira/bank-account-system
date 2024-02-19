import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CardsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /cards/card', async () => {
    const userId = '123';
    const cardNumber = '4567890123456789';
    const response = await request(app.getHttpServer())
      .post('/cards/card')
      .send({ userId, cardNumber });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId', userId);
    expect(response.body).toHaveProperty('cardNumber', cardNumber);
  });

  it('POST /cards/transaction', async () => {
    const userId = '123';
    const cardNumber = '4567890123456789';
    const transactionType = 'credit';
    const amount = 100;
    const response = await request(app.getHttpServer())
      .post('/cards/transaction')
      .send({ userId, cardNumber, transactionType, amount });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId', userId);
    expect(response.body).toHaveProperty('cardNumber', cardNumber);
  });

  it('POST /cards/transaction', async () => {
    const userId = '123';
    const cardNumber = '4567890123456789';
    const transactionType = 'debit';
    const amount = 10;
    const response = await request(app.getHttpServer())
      .post('/cards/transaction')
      .send({ userId, cardNumber, transactionType, amount });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId', userId);
    expect(response.body).toHaveProperty('cardNumber', cardNumber);
  });

  it('GET /cards/:userId', async () => {
    const userId = '123';
    const response = await request(app.getHttpServer()).get(`/cards/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([])); // Assuming an empty array as response
  });

  it('GET /cards/history/:userId/:cardNumber', async () => {
    const userId = '123';
    const cardNumber = '4567890123456789';
    const response = await request(app.getHttpServer()).get(
      `/cards/history/${userId}/${cardNumber}`,
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /cards/balance/:userId/:cardNumber', async () => {
    const userId = '123';
    const cardNumber = '4567890123456789';
    const response = await request(app.getHttpServer()).get(
      `/cards/balance/${userId}/${cardNumber}`,
    );
    expect(response.status).toBe(200);
  });

  it('GET /cards/:userId/:cardNumber', async () => {
    const userId = '123';
    const cardNumber = '4567890123456789';
    const response = await request(app.getHttpServer()).get(
      `/cards/${userId}/${cardNumber}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userId', userId);
    expect(response.body).toHaveProperty('cardNumber', cardNumber);
  });
});

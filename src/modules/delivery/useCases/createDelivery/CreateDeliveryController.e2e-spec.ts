import request from 'supertest';
import { hash } from 'bcrypt';
import prisma from '../../../../database/prismaClient';

import { app } from '../../../../app';

let id_client: string;

describe('Create Delivery controller', () => {
  beforeAll(async () => {
    // Para criar uma entrega (delivery) é necessário que antes seja
    // criado um cliente (client). Isso é basicamente o que estou tentando fazer aqui

    const passwordHash = await hash('12345', 10);

    const client = await prisma.client.create({
      data: {
        username: 'test_client',
        password: passwordHash,
      }
    });

    console.log(client);

    id_client = client.id;
  });

  afterAll(async () => {
    const deleteDeliveries = prisma.delivery.deleteMany();
    const deleteClients = prisma.client.deleteMany();

    await prisma.$transaction([
      deleteDeliveries,
      deleteClients
    ]);

    prisma.$disconnect();
  })

  it('should be able to create a delivery', async () => {
    const tokenResponse = await request(app).post('/client/authenticate').send({
      username: 'test_client',
      password: '12345'
    });

    const { token } = tokenResponse.body;

    const response = await request(app).post('/delivery').send({
      id_client,
      item_name: 'Test item'
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.statusCode).toBe(201);
  });
})
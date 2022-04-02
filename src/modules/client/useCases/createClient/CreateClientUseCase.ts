import { hash } from 'bcrypt';
import prisma from '../../../../database/prismaClient';

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    if (username.trim() === '' || password.trim() === '')
      throw new Error('Username and password can not be blank.');

    const clientAlreadyExists = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    });

    if (clientAlreadyExists)
      throw new Error('Client already exists.');

    const passwordHash = await hash(password, 10);

    const client = await prisma.client.create({
      data: {
        username,
        password: passwordHash
      }
    });

    return client;
  }
}
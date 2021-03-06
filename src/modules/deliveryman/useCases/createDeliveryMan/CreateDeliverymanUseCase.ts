import { hash } from 'bcrypt';
import prisma from '../../../../database/prismaClient';

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    if (username.trim() === '' || password.trim() === '')
      throw new Error('Username and password can not be blank.');

    const deliverymanAlreadyExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    });

    if (deliverymanAlreadyExists)
      throw new Error('Deliveryman already exists.');

    const passwordHash = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: passwordHash
      }
    });

    return deliveryman;
  }
}
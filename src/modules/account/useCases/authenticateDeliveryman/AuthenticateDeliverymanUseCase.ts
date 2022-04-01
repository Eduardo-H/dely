import { prisma } from '../../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { 
        username
      }
    });

    if (!deliveryman)
      throw new Error('Username or password incorrect.');

    const passwordMatches = await compare(password, deliveryman.password);

    if (!passwordMatches)
      throw new Error('Username or password incorrect.');

    const token = sign({ username }, 'a60e64df52acdef32af1cc2b7b47748c', {
      subject: deliveryman.id,
      expiresIn: '1d'
    });

    return {
      token
    };
  }
}
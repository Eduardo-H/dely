import { prisma } from '../../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.client.findFirst({
      where: { 
        username
      }
    });

    if (!client)
      throw new Error('Username or password incorrect.');

    const passwordMatches = await compare(password, client.password);

    if (!passwordMatches)
      throw new Error('Username or password incorrect.');

    const token = sign({ username }, 'a60e64df52acdef32af9cc2b7b47748c', {
      subject: client.id,
      expiresIn: '1d'
    });

    return {
      token
    };
  }
}
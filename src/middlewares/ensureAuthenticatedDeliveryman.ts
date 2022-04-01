import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticatedDeliveryman(
  request: Request, 
  response: Response, 
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token is missing.'
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, 'a60e64df52acdef32af1cc2b7b47748c') as IPayload;

    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: 'Invalid token.'
    });
  }
}
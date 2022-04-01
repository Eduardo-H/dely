import { Request, Response } from 'express';
import { FindAllAvailableDeliveriesUseCase } from './FindAllAvailableDeliveriesUseCase';

export class FindAllAvailableDeliveriesController {
  async handle(request: Request, response: Response) {
    const findAllAvailableDeliveriesUseCase = new FindAllAvailableDeliveriesUseCase();
    const result = await findAllAvailableDeliveriesUseCase.execute();

    return response.status(200).json(result);
  }
}
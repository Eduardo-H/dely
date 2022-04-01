import { Request, Response } from 'express';
import { FindAllClientDeliveriesUseCase } from './FindAllClientDeliveriesUseCase';

export class FindAllClientDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id_client } = request;

    const findAllClientDeliveriesUseCase = new FindAllClientDeliveriesUseCase();
    const result = await findAllClientDeliveriesUseCase.execute(id_client);

    return response.status(200).json(result);
  }
}
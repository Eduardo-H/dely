import { Request, Response } from 'express';
import { FindAllDeliverymanDeliveriesUseCase } from './FindAllDeliverymanDeliveriesUseCase';

export class FindAllDeliverymanDeliveriesController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;

    const findAllDeliverymanDeliveriesUseCase = new FindAllDeliverymanDeliveriesUseCase();
    const result = await findAllDeliverymanDeliveriesUseCase.execute(id_deliveryman);

    return response.status(200).json(result);
  }
}
import { prisma } from '../../../../database/prismaClient';

interface iUpdateDeliverymanUseCase {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateDeliverymanUseCase {
  async execute({ id_delivery, id_deliveryman }: iUpdateDeliverymanUseCase) {
    const result = await prisma.delivery.update({
      where: {
        id: id_delivery
      },
      data: {
        id_deliveryman
      }
    });

    return result;
  }
}
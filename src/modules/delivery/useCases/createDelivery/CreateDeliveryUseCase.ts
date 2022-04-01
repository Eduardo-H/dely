import { prisma } from '../../../../database/prismaClient';

interface iCreateDelivery {
  item_name: string;
  id_client: string;
}

export class CreateDeliveryUseCase {
  async execute({ item_name, id_client }: iCreateDelivery) {
    const delivery = await prisma.delivery.create({
      data: {
        item_name,
        id_client
      }
    });

    return delivery;
  }
}
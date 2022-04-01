import { prisma } from '../../../../database/prismaClient';

export class FindAllAvailableDeliveriesUseCase {
  async execute() {
    const openDeliveries = await prisma.delivery.findMany({
      where: {
        ended_at: null
      }
    });

    return openDeliveries;
  }
}
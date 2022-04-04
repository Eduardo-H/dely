import prisma from "../../../../database/prismaClient";

interface IUpdateEndDate {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateEndDateUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateEndDate) {
    const delivery = await prisma.delivery.findFirst({
      where: {
        id: id_delivery
      }
    });

    if (delivery?.id_deliveryman !== id_deliveryman)
     throw new Error('Deliveryman is different from the original delivery.');

    const updatedDelivery = await prisma.delivery.update({
      where: {
        id: id_delivery
      },
      data: {
        ended_at: new Date()
      }
    });

    return updatedDelivery;
  }
}
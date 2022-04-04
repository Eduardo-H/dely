import { UpdateDeliverymanUseCase } from './UpdateDeliverymanUseCase';
import { CreateClientUseCase } from '../../../client/useCases/createClient/CreateClientUseCase';
import { CreateDeliverymanUseCase } from '../../../deliveryman/useCases/createDeliveryMan/CreateDeliverymanUseCase';
import { CreateDeliveryUseCase } from '../createDelivery/CreateDeliveryUseCase';
import { prismaMock } from '../../../../../singleton';

let updateDeliverymanUseCase: UpdateDeliverymanUseCase;
let createClientUseCase: CreateClientUseCase;
let createDeliverymanUseCase: CreateDeliverymanUseCase;
let createDeliveryUseCase: CreateDeliveryUseCase;

beforeAll(() => {
  updateDeliverymanUseCase = new UpdateDeliverymanUseCase();
  createClientUseCase = new CreateClientUseCase();
  createDeliverymanUseCase = new CreateDeliverymanUseCase();
  createDeliveryUseCase = new CreateDeliveryUseCase();
});

describe('Update deliveryman use case', () => {
  it('should be able to update the deliveryman of a delivery', async () => {
    // Creating the client
    const client = {
      id: '17a75e7a-34bd-44cc-b613-bcfbaa7f89d8',
      username: 'john_doe',
      password: 'strong_password'
    };
  
    prismaMock.client.create.mockResolvedValue(client);
    await createClientUseCase.execute(client);
  
    // Creating the delivery
    const delivery = {
      id: 'f57a429d-c410-446f-9ebe-f7d8952ad3d4',
      item_name: 'Laptop',
      id_client: client.id,
      created_at: new Date(),
      ended_at: null,
      id_deliveryman: null
    }

    prismaMock.delivery.create.mockResolvedValue(delivery);
    await createDeliveryUseCase.execute({
      item_name: delivery.item_name,
      id_client: delivery.id_client
    });

    // Creating the deliveryman
    const deliveryman = {
      id: 'f83ff836-8829-421b-82ee-831a1815f5fe',
      username: 'max_junior',
      password: 'deliveries'
    };

    prismaMock.deliveryman.create.mockResolvedValue(deliveryman);
    await createDeliverymanUseCase.execute(deliveryman);

    // Adding the deliveryman to the delivery
    prismaMock.delivery.update.mockResolvedValue({...delivery, id_deliveryman: deliveryman.id});
    const result = await updateDeliverymanUseCase.execute({
      id_delivery: delivery.id,
      id_deliveryman: deliveryman.id
    });

    expect(result.id).toEqual(delivery.id);
    expect(result.id_client).toEqual(client.id);
    expect(result.id_deliveryman).toEqual(deliveryman.id);
    expect(result.ended_at).toBeNull();
  });
})
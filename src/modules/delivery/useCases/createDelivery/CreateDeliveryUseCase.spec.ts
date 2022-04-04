import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';
import { CreateClientUseCase } from '../../../client/useCases/createClient/CreateClientUseCase';
import { prismaMock } from '../../../../../singleton';

let createDeliveryUseCase: CreateDeliveryUseCase;
let createClientUseCase: CreateClientUseCase;

beforeAll(() => {
  createDeliveryUseCase = new CreateDeliveryUseCase();
  createClientUseCase = new CreateClientUseCase();
});

describe('Create delivery use case', () => {
  it('should be able to create a new delivery', async () => {
    const client = {
      id: '17a75e7a-34bd-44cc-b613-bcfbaa7f89d8',
      username: 'john_doe',
      password: 'strong_password'
    };
  
    prismaMock.client.create.mockResolvedValue(client);
    await createClientUseCase.execute(client);
  
    const delivery = {
      id: 'f57a429d-c410-446f-9ebe-f7d8952ad3d4',
      item_name: 'Laptop',
      id_client: client.id,
      created_at: new Date(),
      ended_at: null,
      id_deliveryman: null
    }

    prismaMock.delivery.create.mockResolvedValue(delivery);

    const result = await createDeliveryUseCase.execute({
      item_name: delivery.item_name,
      id_client: delivery.id_client
    });

    expect(result).toHaveProperty('id');
    expect(result.item_name).toEqual('Laptop');
    expect(result.id_client).toEqual(client.id);
    expect(result.ended_at).toBeNull();
  });
})
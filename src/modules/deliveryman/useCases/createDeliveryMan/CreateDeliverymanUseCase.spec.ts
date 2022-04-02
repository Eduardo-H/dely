import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase';
import { prismaMock } from '../../../../../singleton';

let createDeliverymanUseCase: CreateDeliverymanUseCase;

beforeAll(() => {
  createDeliverymanUseCase = new CreateDeliverymanUseCase();
});

describe('Create deliveryman use case', () => {
  it('should be able to create a new deliveryman', async () => {
    const deliveryman = {
      id: '17a75e7a-34bd-44cc-b613-bcfbaa7f89d8',
      username: 'john_doe',
      password: 'strong_password'
    };
  
    prismaMock.deliveryman.create.mockResolvedValue(deliveryman);
    const result = await createDeliverymanUseCase.execute(deliveryman);
  
    expect(result).toHaveProperty('id');
    expect(result.username).toEqual('john_doe');
  });
  
  it('should not be able to create a deliveryman with a blank username', async () => {
    const deliveryman = {
      id: 'f5aca15e-bf76-4c23-a76c-507929980b87',
      username: '',
      password: 'strong_password'
    };
  
    prismaMock.deliveryman.create.mockRejectedValue(new Error('Username and password can not be blank.'));
  
    await expect(
      createDeliverymanUseCase.execute(deliveryman)
    ).rejects.toEqual(new Error('Username and password can not be blank.'));
  });

  it('should not be able to create a deliveryman with a blank password', async () => {
    const deliveryman = {
      id: 'f5aca15e-bf76-4c23-a76c-507929980b87',
      username: 'john_doe',
      password: ''
    };
  
    prismaMock.deliveryman.create.mockRejectedValue(new Error('Username and password can not be blank.'));
  
    await expect(
      createDeliverymanUseCase.execute(deliveryman)
    ).rejects.toEqual(new Error('Username and password can not be blank.'));
  });

  it('should not be able to create a repeated deliveryman', async () => {
    const firstDeliveryman = {
      id: '17a75e7a-34bd-44cc-b613-bcfbaa7f89d8',
      username: 'john_doe',
      password: 'strong_password'
    };
  
    prismaMock.deliveryman.create.mockResolvedValue(firstDeliveryman);
    await createDeliverymanUseCase.execute(firstDeliveryman);
  
    const secondDeliveryman = {
      id: 'f5aca15e-bf76-4c23-a76c-507929980b87',
      username: 'john_doe',
      password: 'testing'
    };
  
    prismaMock.deliveryman.create.mockRejectedValue(new Error('Deliveryman already exists.'));
  
    await expect(
      createDeliverymanUseCase.execute(secondDeliveryman)
    ).rejects.toEqual(new Error('Deliveryman already exists.'));
  });
})
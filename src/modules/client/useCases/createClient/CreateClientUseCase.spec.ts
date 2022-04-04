import { CreateClientUseCase } from './CreateClientUseCase';
import { prismaMock } from '../../../../../singleton';

let createClientUseCase: CreateClientUseCase;

beforeAll(() => {
  createClientUseCase = new CreateClientUseCase();
});

describe('Create client use case', () => {
  it('should be able to create a new client', async () => {
    const client = {
      id: '17a75e7a-34bd-44cc-b613-bcfbaa7f89d8',
      username: 'john_doe',
      password: 'strong_password'
    };
  
    prismaMock.client.create.mockResolvedValue(client);
    const result = await createClientUseCase.execute(client);
  
    expect(result).toHaveProperty('id');
    expect(result.username).toEqual('john_doe');
  });
  
  it('should not be able to create a client with a blank username', async () => {
    const client = {
      id: 'f5aca15e-bf76-4c23-a76c-507929980b87',
      username: '',
      password: 'strong_password'
    };
  
    prismaMock.client.create.mockRejectedValue(new Error('Username and password can not be blank.'));
  
    await expect(
      createClientUseCase.execute(client)
    ).rejects.toEqual(new Error('Username and password can not be blank.'));
  });

  it('should not be able to create a client with a blank password', async () => {
    const client = {
      id: 'f5aca15e-bf76-4c23-a76c-507929980b87',
      username: 'john_doe',
      password: ''
    };
  
    prismaMock.client.create.mockRejectedValue(new Error('Username and password can not be blank.'));
  
    await expect(
      createClientUseCase.execute(client)
    ).rejects.toEqual(new Error('Username and password can not be blank.'));
  });

  it('should not be able to create a repeated client', async () => {
    const firstClient = {
      id: '17a75e7a-34bd-44cc-b613-bcfbaa7f89d8',
      username: 'john_doe',
      password: 'strong_password'
    };
  
    prismaMock.client.create.mockResolvedValue(firstClient);
    await createClientUseCase.execute(firstClient);
  
    const secondClient = {
      id: 'f5aca15e-bf76-4c23-a76c-507929980b87',
      username: 'john_doe',
      password: 'testing'
    };
  
    prismaMock.client.create.mockRejectedValue(new Error('Client already exists.'));
  
    await expect(
      createClientUseCase.execute(secondClient)
    ).rejects.toEqual(new Error('Client already exists.'));
  });
})
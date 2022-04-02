import { CreateClientUseCase } from './CreateClientUseCase';
import { prismaMock } from '../../../../../singleton';

let createClientUseCase: CreateClientUseCase;

beforeAll(() => {
  createClientUseCase = new CreateClientUseCase();
});

it('should be able to create a new user', async () => {
  const client = {
    id: '17a75e7a-34bd-44cc-b613-bcfbaa7f89d8',
    username: 'john_doe',
    password: 'testing'
  };

  prismaMock.client.create.mockResolvedValue(client);
  const result = await createClientUseCase.execute(client);

  expect(result).toHaveProperty('id');
  expect(result.username).toEqual('john_doe');
});
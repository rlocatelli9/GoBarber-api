import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should not be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'user.email@example.com.br',
      password: '123456',
      name: 'User',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'user2.email@example.com.br',
      password: '123456',
      name: 'User 2',
    });

    const user3 = await fakeUsersRepository.create({
      email: 'user3.email@example.com.br',
      password: '123456',
      name: 'User 3',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'user4.email@example.com.br',
      password: '123456',
      name: 'User 4',
    });

    const providers = await listProviders.execute({
      userId: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2, user3]);
  });
});

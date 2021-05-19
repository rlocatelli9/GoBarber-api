import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the cache providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'user.email@example.com.br',
      password: '123456',
      name: 'User',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'user4.email@example.com.br',
      password: '123456',
      name: 'User 4',
    });

    await fakeCacheProvider.save(
      `providers-list:${loggedUser.id}`,
      JSON.stringify([user1]),
    );

    const providers = await listProviders.execute({
      userId: loggedUser.id,
    });

    expect(providers).toEqual(JSON.stringify([user1]));
  });

  it('should be able to list the database providers if cache does not exits', async () => {
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

    const providers = await listProviders.execute({
      userId: 'user-non-existing',
    });

    expect(providers).toEqual(expect.arrayContaining([user1, user2]));
  });
});

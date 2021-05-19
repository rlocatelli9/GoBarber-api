import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      email: 'user@example.com',
      password: '123456',
      name: 'Robson Locatelli',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Robson Locatelli');
  });

  it('should not be able to create two user with same e-mail', async () => {
    const userEMail = 'user@example.com';

    await createUser.execute({
      email: userEMail,
      password: '123456',
      name: 'Robson Locatelli',
    });

    await expect(
      createUser.execute({
        email: userEMail,
        password: '123456',
        name: 'Robson Locatelli',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      email: 'user@example.com',
      password: '123456',
      name: 'Robson Locatelli',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Robson Locatelli');
  });

  it('should not be able to create two user with same e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const userEMail = 'user@example.com';

    await createUser.execute({
      email: userEMail,
      password: '123456',
      name: 'Robson Locatelli',
    });

    expect(
      createUser.execute({
        email: userEMail,
        password: '123456',
        name: 'Robson Locatelli',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

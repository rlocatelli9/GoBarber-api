import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should not be able to update profile if user does not exists', async () => {
    await fakeUsersRepository.create({
      email: 'user@example.com',
      password: '123456',
      name: 'Robson Locatelli',
    });

    await expect(
      updateProfile.execute({
        userId: 'id_non_existing',
        name: 'Robson Locatelli',
        email: 'user@example.com',
        newPassword: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@example.com',
      password: '123456',
      name: 'Robson Locatelli',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'outro user',
      email: 'outro.user@example.com',
    });

    expect(updatedUser.name).toBe('outro user');
    expect(updatedUser.email).toBe('outro.user@example.com');
  });

  it('should not be able to change the e-mail for another e-mail already in use', async () => {
    await fakeUsersRepository.create({
      email: 'user@example.com',
      password: '123456',
      name: 'Robson Locatelli',
    });

    const anotherUser = await fakeUsersRepository.create({
      email: 'another.user@example.com',
      password: '123456',
      name: 'Another User',
    });

    await expect(
      updateProfile.execute({
        userId: anotherUser.id,
        name: 'Another User',
        email: 'user@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@example.com',
      password: '123456',
      name: 'Robson Locatelli',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'outro user',
      email: 'user@example.com',
      oldPassword: '123456',
      newPassword: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@example.com',
      password: '123456',
      name: 'Robson Locatelli',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'Robson Locatelli',
        email: 'user@example.com',
        newPassword: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password if is wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@example.com',
      password: '123456',
      name: 'Robson Locatelli',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'Robson Locatelli',
        email: 'user@example.com',
        newPassword: '123123',
        oldPassword: '654',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

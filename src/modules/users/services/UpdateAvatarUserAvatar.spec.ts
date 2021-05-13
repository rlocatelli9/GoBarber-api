import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateAvatarUserService';

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    const user = await fakeUsersRepository.create({
      email: 'user@example.com',
      password: '123456',
      name: 'Robson Locatelli',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar if user not exists', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        userId: '123',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar when updating new one', async () => {
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFileFunction = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    const user = await fakeUsersRepository.create({
      email: 'user@example.com',
      password: '123456',
      name: 'Robson Locatelli',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFileFunction).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});

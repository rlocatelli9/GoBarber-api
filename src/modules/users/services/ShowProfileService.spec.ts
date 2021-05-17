import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should not be able to show profile if user does not exists', async () => {
    await expect(
      showProfile.execute({
        userId: 'id_non_existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'user@example.com',
      password: '123456',
      name: 'Robson Locatelli',
    });

    const profile = await showProfile.execute({
      userId: user.id,
    });

    expect(profile.name).toBe('Robson Locatelli');
    expect(profile.email).toBe('user@example.com');
  });
});

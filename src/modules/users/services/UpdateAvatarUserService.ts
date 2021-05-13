import User from '@modules/users/infra/typeorm/entities/User';

import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/interfaces/IStorageProvider';
import IUsersRepository from '../repositories/interfaces/UsersRepository';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateAvatarUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError(
        'Somente usuários autenticados podem alterar o Avatar',
        401,
      );
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarUserService;

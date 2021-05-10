import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/uploadConfig';

import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
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
      // Deletar avatar anterior caso exista
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarUserService;

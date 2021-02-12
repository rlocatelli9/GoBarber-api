import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/uploadConfig';

import AppError from '../errors/AppError';

interface Request {
  userId: string;
  avatarFilename: string;
}

class UpdateAvatarUserService {
  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

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

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarUserService;

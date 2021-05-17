import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/interfaces/IHashProvider';
import IUsersRepository from '../repositories/interfaces/UsersRepository';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
}

@injectable()
class UpdateAvatarUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    newPassword,
    oldPassword,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
      throw new AppError('Email already in use');
    }

    user.name = name;
    user.email = email;

    if (newPassword && !oldPassword) {
      throw new AppError('Is missing the old password');
    }

    if (newPassword && oldPassword) {
      const isMatchOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!isMatchOldPassword) {
        throw new AppError('The old password is failed');
      }

      user.password = await this.hashProvider.generateHash(newPassword);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateAvatarUserService;

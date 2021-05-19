import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/interfaces/UsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/interfaces/CacheProvider';

interface IRequest {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ userId }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${userId}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        exceptUserId: userId,
      });

      await this.cacheProvider.save(`providers-list:${userId}`, users);
    }

    return users;
  }
}

export default ListProvidersService;

import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/interfaces/UsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      exceptUserId: userId,
    });

    return users;
  }
}

export default ListProvidersService;

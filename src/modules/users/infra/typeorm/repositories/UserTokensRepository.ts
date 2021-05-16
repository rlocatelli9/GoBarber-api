import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/interfaces/IUserTokensRepository';

import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    // criando o repositório
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generateToken(userId: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ userId });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;

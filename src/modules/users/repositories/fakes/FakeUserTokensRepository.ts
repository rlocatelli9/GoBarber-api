import { v4 as uuid } from 'uuid';

import IUserTokensRepository from '@modules/users/repositories/interfaces/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generateToken(userId: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(element => element.token === token);

    return userToken;
  }
}

export default UserTokensRepository;

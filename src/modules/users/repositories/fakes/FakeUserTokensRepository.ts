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
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default UserTokensRepository;

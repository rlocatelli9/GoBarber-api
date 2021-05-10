import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import userWithoutPasswordViews from '@modules/users/infra/views/userWithoutPasswordViews';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    const userAuthenticated = userWithoutPasswordViews.render(user);

    return response.json({
      user: userAuthenticated,
      token,
    });
  }
}

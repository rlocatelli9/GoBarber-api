import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import userWithoutPasswordViews from '@modules/users/infra/views/userWithoutPasswordViews';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    const newUser = userWithoutPasswordViews.render(user);

    return response.json(newUser);
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import userWithoutPasswordViews from '@modules/users/infra/views/userWithoutPasswordViews';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfileUser = container.resolve(ShowProfileService);

    const user = await showProfileUser.execute({ userId });

    const newUser = userWithoutPasswordViews.render(user);

    return response.json(newUser);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, oldPassword, newPassword } = request.body;
    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute({
      userId,
      name,
      email,
      newPassword,
      oldPassword,
    });

    const newUser = userWithoutPasswordViews.render(user);

    return response.json(newUser);
  }
}

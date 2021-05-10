import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarUserService from '@modules/users/services/UpdateAvatarUserService';
import userWithoutPasswordViews from '@modules/users/infra/views/userWithoutPasswordViews';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatarUserService = container.resolve(UpdateAvatarUserService);
    const user = await updateAvatarUserService.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    const userWithAvatar = userWithoutPasswordViews.render(user);

    return response.json(userWithAvatar);
  }
}

import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/uploadConfig';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateAvatarUserService from '@modules/users/services/UpdateAvatarUserService';
import userWithoutPasswordViews from '@modules/users/infra/views/userWithoutPasswordViews';

import ensureAuthenticatedMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticatedMiddleware';

const upload = multer(uploadConfig);

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    email,
    password,
  });

  const newUser = userWithoutPasswordViews.render(user);

  return response.json(newUser);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticatedMiddleware,
  upload.single('avatar'),
  async (request, response) => {
    const updateAvatarUserService = new UpdateAvatarUserService();
    const user = await updateAvatarUserService.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    const userWithAvatar = userWithoutPasswordViews.render(user);

    return response.json(userWithAvatar);
  },
);

export default usersRouter;

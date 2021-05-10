import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import userWithoutPasswordViews from '@modules/users/infra/views/userWithoutPasswordViews';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { email, password } = request.body;
  const authenticateUserService = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  const userAuthenticated = userWithoutPasswordViews.render(user);

  return response.json({
    user: userAuthenticated,
    token,
  });
});

export default sessionsRouter;

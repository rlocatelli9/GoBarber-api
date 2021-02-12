import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import userWithoutPasswordViews from '../views/userWithoutPasswordViews';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUserService = new AuthenticateUserService();

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

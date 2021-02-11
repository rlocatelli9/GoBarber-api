import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import userWithoutPasswordViews from '../views/userWithoutPasswordViews';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
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

    // return response.json({ user, });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;

import { Router } from 'express';

import ensureAuthenticatedMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticatedMiddleware';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticatedMiddleware);

profileRouter.get('/', profileController.show);

profileRouter.put('/', profileController.update);

export default profileRouter;

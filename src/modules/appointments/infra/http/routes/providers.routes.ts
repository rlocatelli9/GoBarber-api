import { Router } from 'express';

import ensureAuthenticatedMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticatedMiddleware';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticatedMiddleware);

providersRouter.get('/', providersController.index);

export default providersRouter;

import { Router } from 'express';

import ensureAuthenticatedMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticatedMiddleware';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticatedMiddleware);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:providerId/month-availability',
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:providerId/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRouter;

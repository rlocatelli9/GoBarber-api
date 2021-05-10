import { Router } from 'express';
import { parseISO } from 'date-fns';

import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticatedMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticatedMiddleware';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticatedMiddleware);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    providerId,
  });

  return response.json(appointment);
});

export default appointmentsRouter;

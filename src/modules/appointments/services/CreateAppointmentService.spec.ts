import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '21321321321',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('21321321321');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 18);

    await createAppointment.execute({
      date: appointmentDate,
      providerId: '21321321321',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: '21321321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

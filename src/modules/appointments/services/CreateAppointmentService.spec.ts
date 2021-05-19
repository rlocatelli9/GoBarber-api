import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 18, 9).getTime(); // Date.now retorna um number por isso o getTime
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 4, 18, 10),
      providerId: '21321321321',
      userId: '23234',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('21321321321');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 4, 19, 16);

    await createAppointment.execute({
      date: appointmentDate,
      providerId: '21321321321',
      userId: '23234',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: '21321321321',
        userId: '23234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime(); // Date.now retorna um number por isso o getTime
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 10, 11),
        providerId: '21321321321',
        userId: '23234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 10).getTime(); // Date.now retorna um number por isso o getTime
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 10, 13),
        providerId: '23234',
        userId: '23234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 18, 10).getTime(); // Date.now retorna um number por isso o getTime
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 19, 7),
        providerId: '23324234',
        userId: '23234',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 19, 18),
        providerId: '2342311',
        userId: '23234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

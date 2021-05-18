import 'reflect-metadata';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should not be able to list the the appointments on a specific day', async () => {
    const appointments1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 16, 8, 0, 0),
      providerId: '4234234k23423',
      userId: 'id_fake',
    });

    const appointments2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 16, 17, 0, 0),
      providerId: '4234234k23423',
      userId: 'id_fake',
    });

    const appointments = await listProviderAppointments.execute({
      providerId: '4234234k23423',
      day: 16,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointments1, appointments2]);
  });
});

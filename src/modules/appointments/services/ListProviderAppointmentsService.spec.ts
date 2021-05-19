import 'reflect-metadata';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the cache appointments on a specific day', async () => {
    const appointments1 = await fakeAppointmentsRepository.create({
      date: new Date(2021, 4, 19, 15, 0, 0),
      providerId: '4234234k23423',
      userId: 'id_fake',
    });

    const appointments2 = await fakeAppointmentsRepository.create({
      date: new Date(2021, 4, 19, 17, 0, 0),
      providerId: '4234234k23423',
      userId: 'id_fake',
    });

    const cacheKey = `provider-appointments:4234234k23423:2021-5-19`;

    await fakeCacheProvider.save(
      `${cacheKey}`,
      JSON.stringify([appointments1, appointments2]),
    );

    const appointments = await listProviderAppointments.execute({
      providerId: '4234234k23423',
      day: 19,
      month: 5,
      year: 2021,
    });

    expect(appointments).toEqual(
      JSON.stringify([appointments1, appointments2]),
    );
  });

  it('should be able to list the the appointments on a specific day', async () => {
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

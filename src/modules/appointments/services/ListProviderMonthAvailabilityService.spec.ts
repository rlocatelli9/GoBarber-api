import 'reflect-metadata';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should not be able to list the month availability from providers', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 16, 8, 0, 0),
      providerId: '4234234k23423',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 16, 9, 0, 0),
      providerId: '4234234k23423',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 16, 10, 0, 0),
      providerId: '4234234k23423',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 16, 11, 0, 0),
      providerId: '4234234k23423',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 16, 12, 0, 0),
      providerId: '4234234k23423',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 16, 13, 0, 0),
      providerId: '4234234k23423',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 16, 14, 0, 0),
      providerId: '4234234k23423',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 16, 15, 0, 0),
      providerId: '4234234k23423',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 16, 16, 0, 0),
      providerId: '4234234k23423',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 16, 17, 0, 0),
      providerId: '4234234k23423',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 17, 10, 0, 0),
      providerId: '4234234k23423',
    });

    const availability = await listProviderMonthAvailability.execute({
      providerId: '4234234k23423',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 15, available: true },
        { day: 16, available: false },
        { day: 17, available: true },
        { day: 18, available: true },
      ]),
    );
  });
});

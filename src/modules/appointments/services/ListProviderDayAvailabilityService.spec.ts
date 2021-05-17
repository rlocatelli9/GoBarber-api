import 'reflect-metadata';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should not be able to list the day availability from providers', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 17, 8, 0, 0),
      providerId: '4234234k23423',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 17, 10, 0, 0),
      providerId: '4234234k23423',
    });

    const availability = await listProviderDayAvailability.execute({
      providerId: '4234234k23423',
      day: 17,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});

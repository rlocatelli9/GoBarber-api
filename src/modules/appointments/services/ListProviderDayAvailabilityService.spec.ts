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

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 17, 13, 0, 0),
      providerId: '4234234k23423',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 17, 14, 0, 0),
      providerId: '4234234k23423',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 17, 11, 0, 0).getTime();
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
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 12, available: true },
        { hour: 13, available: false },
        { hour: 14, available: false },
        { hour: 15, available: true },
      ]),
    );
  });
});

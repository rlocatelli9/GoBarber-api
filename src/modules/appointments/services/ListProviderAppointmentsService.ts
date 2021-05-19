import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/interfaces/AppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/interfaces/CacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    providerId,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cachedData = await this.cacheProvider.recover('teste');

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        providerId,
        day,
        month,
        year,
      },
    );

    // await this.cacheProvider.save('teste', 'teste');

    return appointments;
  }
}

export default ListProviderAppointmentsService;

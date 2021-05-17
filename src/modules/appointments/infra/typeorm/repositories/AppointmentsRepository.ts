import { getRepository, Repository, Raw } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/interfaces/AppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/interfaces/CreateAppointmentDTO';
import IFindAllInMonthFromProvider from '@modules/appointments/dtos/interfaces/FindAllInMonthFromProviderDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    // criando o repositório
    this.ormRepository = getRepository(Appointment);
  }

  /**
   * findByDate
   * Método responsável por pesquisar se existe algum agendamento
   * com base na data passada.
   */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year,
  }: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        providerId,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, MM-YYYY) = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async create({
    date,
    providerId,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      providerId,
      date,
    });
    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

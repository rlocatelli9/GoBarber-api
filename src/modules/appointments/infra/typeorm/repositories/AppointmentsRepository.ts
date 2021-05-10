import { EntityRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/interfaces/AppointmentsRespository';
import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository
  extends Repository<Appointment>
  implements IAppointmentsRepository {
  /**
   * findByDate
   * Método responsável por pesquisar se existe algum agendamento
   * com base na data passada.
   */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;

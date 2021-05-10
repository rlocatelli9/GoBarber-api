import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  /**
   * findByDate
   * Método responsável por pesquisar se existe algum agendamento
   * com base na data passada.
   */
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;

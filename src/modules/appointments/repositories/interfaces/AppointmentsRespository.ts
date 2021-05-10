import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  findByDate(data: Date): Promise<Appointment | undefined>;
}

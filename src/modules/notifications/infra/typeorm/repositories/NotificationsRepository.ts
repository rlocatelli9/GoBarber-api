import { getMongoRepository, MongoRepository } from 'typeorm';
import INotificiationsRepository from '@modules/notifications/repositories/interfaces/NotificiationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/interfaces/CreateNotificationDTO';
import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificiationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    // criando o repositório
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipientId,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      recipientId,
      content,
    });
    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;

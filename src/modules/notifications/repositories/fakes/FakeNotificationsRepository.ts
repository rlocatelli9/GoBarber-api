import { ObjectID } from 'mongodb';
import INotificiationsRepository from '@modules/notifications/repositories/interfaces/NotificiationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/interfaces/CreateNotificationDTO';
import Notification from '../../infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificiationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipientId,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipientId });

    return notification;
  }
}

export default NotificationsRepository;

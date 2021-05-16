import IMailProvider from '@shared/container/providers/MailProvider/models/interfaces/IMailProvider';
import ISendMailDTO from '../dtos/interfaces/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

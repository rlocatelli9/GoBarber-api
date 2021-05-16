import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/interfaces/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}

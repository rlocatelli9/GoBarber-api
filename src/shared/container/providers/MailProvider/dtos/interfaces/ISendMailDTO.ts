import IParseMailTemplateMailDTO from '@shared/container/providers/MailTemplateProvider/dtos/interface/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateMailDTO;
}

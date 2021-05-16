import IParseMailTemplateDTO from '../dtos/interface/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/interface/IMailTemplateProvider';

export default class FakeMailProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

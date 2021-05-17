import IMailTemplateProvider from '../models/interface/IMailTemplateProvider';

export default class FakeMailProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

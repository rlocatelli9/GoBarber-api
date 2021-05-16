import handlebars from 'handlebars';

import IParseMailTemplateDTO from '../dtos/interface/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/interface/IMailTemplateProvider';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}

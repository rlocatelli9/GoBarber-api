import IParseMailTemplateDto from '../../dtos/interface/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDto): Promise<string>;
}

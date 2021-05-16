import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/interfaces/IMailProvider';
import IUsersRepository from '../repositories/interfaces/UsersRepository';
import IUserTokensRepository from '../repositories/interfaces/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.userTokensRepository.generateToken(
      userExists.id,
    );

    await this.mailProvider.sendMail(
      email,
      `mensagem para recuperação de senha: ${token}`,
    );
  }
}

export default SendForgotPasswordEmailService;

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { resolve } from 'path';

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

    const forgotPasswordTemplate = resolve(
      __dirname,
      '..',
      'templates',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: userExists.name,
        email: userExists.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: userExists.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;

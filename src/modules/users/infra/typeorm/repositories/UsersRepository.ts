import { getRepository, Not, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/interfaces/UsersRepository';
import ICreateUserDTO from '@modules/users/dtos/interfaces/CreateUserDTO';
import IFindAllProvidersDTO from '@modules/appointments/dtos/interfaces/FindAllProvidersDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    // criando o repositório
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({
    exceptUserId,
  }: IFindAllProvidersDTO): Promise<User[]> {
    if (exceptUserId) {
      const users = this.ormRepository.find({
        where: {
          id: Not(exceptUserId),
        },
      });

      return users;
    }

    const users = this.ormRepository.find();
    return users;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;

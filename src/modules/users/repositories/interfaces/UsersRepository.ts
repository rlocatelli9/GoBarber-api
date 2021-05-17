import IFindAllProvidersDTO from '@modules/appointments/dtos/interfaces/FindAllProvidersDTO';
import ICreateUserDTO from '@modules/users/dtos/interfaces/CreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
}

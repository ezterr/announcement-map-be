import { UserRepository } from '../repository/user.repository';
import { NotFoundError, ValidationError } from '../utils/errors';
import { CreateUserRecord } from '../utils/create-record/create-user-record';
import { UpdateUserDto, UserEntityResponse, CreateUserDto } from '../types';

export class UserService {
  public static async getUsers(offset: number, count: number): Promise<UserEntityResponse[]> {
    const users = await UserRepository.findAll(offset, count);

    return users.map((e) => {
      const { password, jwtControlKey, ...userEntityRes } = e;
      return userEntityRes;
    });
  }

  public static async getUser(id: string): Promise<UserEntityResponse> {
    const user = await UserRepository.findOneById(id);
    if (user === null) throw new NotFoundError(`Not Found user with id: ${id}`);

    const { password, jwtControlKey, ...userEntityRes } = user;

    return userEntityRes;
  }

  public static async createUser(body: CreateUserDto): Promise<UserEntityResponse> {
    const isEmailUniqueness = await UserRepository.checkEmailUniqueness(body.email);
    const isUsernameUniqueness = await UserRepository.checkUsernameUniqueness(body.username);

    if (!isEmailUniqueness) {
      throw new ValidationError('Email must be uniqueness.', 'Email must be uniqueness.');
    }

    if (!isUsernameUniqueness) {
      throw new ValidationError('Username must be uniqueness.', 'Username must be uniqueness.');
    }

    const user = await CreateUserRecord.createUserRecord(body);

    const insertResult = await UserRepository.insert(user);
    if (!insertResult) throw new Error('User has not been created.');

    const { password: resPassword, jwtControlKey: resJwtControlKey, ...userEntityRes } = insertResult;

    return userEntityRes;
  }

  public static async updateUser(id: string, body: UpdateUserDto): Promise<UserEntityResponse> {
    const user = await UserRepository.findOneById(id);
    if (user === null) throw new NotFoundError(`Not Found user with id: ${id}`);

    const newUser = await CreateUserRecord.updateUserRecord(body, user);

    const updateResult = await UserRepository.update(newUser);
    if (!updateResult) throw new Error('User has not been updated');

    const { password: hashPassword, jwtControlKey, ...userEntityRes } = updateResult;

    return userEntityRes;
  }

  public static async deleteUser(id: string): Promise<string> {
    const deleteResult = await UserRepository.deleteById(id);
    if (!deleteResult) throw new ValidationError('Invalid user id');

    return deleteResult;
  }
}

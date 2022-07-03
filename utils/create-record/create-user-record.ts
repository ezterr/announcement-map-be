import { v4 as uuid } from 'uuid';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { compare, hash } from 'bcrypt';
import { UserRole, CreateUserDto, UpdateUserDto } from '../../types';
import { UserRecord } from '../../records/user.record';
import { UserValidation } from '../validation/user-validation';
import { AuthError, ValidationError } from '../errors';

export class CreateUserRecord {
  public static async createUserRecord(userData: CreateUserDto): Promise<UserRecord> {
    const {
      firstName, lastName, username, email, password,
    } = userData;

    if (!UserValidation.validatePassword(password)) {
      throw new ValidationError(
        'Password must contain eight characters, at least one letter and one number.',
        'Password must contain eight characters, at least one letter and one number.',
      );
    }

    const jwtControlKey = (await promisify(randomBytes)(32)).toString('hex');
    const hashPassword = await hash(password as string, 12);

    const user = new UserRecord({
      id: uuid(),
      firstName,
      lastName,
      username,
      email,
      avatar: 'default',
      password: hashPassword,
      jwtControlKey,
      role: UserRole.User,
    });

    user.validate();

    return user;
  }

  public static async updateUserRecord(userData: UpdateUserDto, oldUser: UserRecord): Promise<UserRecord> {
    const {
      firstName, lastName, email, newPassword, password, avatar,
    } = userData;

    const user = new UserRecord(oldUser);

    user.firstName = firstName !== undefined ? String(firstName) : user.firstName;
    user.lastName = lastName !== undefined ? String(lastName) : user.lastName;
    user.avatar = avatar !== undefined ? String(avatar) : user.avatar;

    if (newPassword || email !== user.email) {
      const passwordCompareResult = password ? await compare(password, user.password as string) : false;

      if (passwordCompareResult) {
        user.email = email !== undefined ? String(email) : user.email;

        if (newPassword) {
          if (UserValidation.validatePassword(newPassword)) {
            user.password = await hash(newPassword as string, 12);
          } else {
            throw new ValidationError(
              'password must contain eight characters, at least one letter and one number',
              'password must contain eight characters, at least one letter and one number',
            );
          }
        }
      } else {
        throw new AuthError('Unauthorized', 'Unauthorized');
      }
    }

    user.validate();

    return user;
  }
}

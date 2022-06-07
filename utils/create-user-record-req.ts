import { Request } from 'express';
import { v4 as uuid } from 'uuid';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { compare, hash } from 'bcrypt';
import { SignupUserEntity, UserRole, UpdateUserEntity } from '../types';
import { UserRecord } from '../records/user.record';
import { UserValidation } from './validation/user-validation';
import { AuthError, ValidationError } from './errors';

export class CreateUserRecordReq {
  public static async createUser(req: Request): Promise<UserRecord> {
    const {
      firstName, lastName, username, email, password,
    } = req.body as SignupUserEntity;

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
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: username.trim(),
      email: email.trim(),
      avatar: 'default',
      password: hashPassword,
      jwtControlKey,
      role: UserRole.User,
    });
    user.validateAllData();

    return user;
  }

  public static async updateUser(req: Request, oldUser: UserRecord): Promise<UserRecord> {
    const {
      firstName, lastName, email, newPassword, password, avatar,
    } = req.body as UpdateUserEntity;

    const user = new UserRecord(oldUser);

    user.firstName = String(firstName).trim() || user.firstName;
    user.lastName = String(lastName).trim() || user.lastName;
    user.avatar = String(avatar).trim() || user.avatar;

    if (newPassword || email !== user.email) {
      const passwordCompareResult = password ? await compare(password, user.password as string) : false;

      if (passwordCompareResult) {
        user.email = String(email).trim() || user.email;

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

    user.validateAllData();

    return user;
  }
}

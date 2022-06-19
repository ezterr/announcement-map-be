import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { UserRole } from '../types';
import { AUTH_TIME, JWT_SECRET, JWT_REFRESH_SECRET } from '../config/secret';
import { UserRepository } from '../repository/user.repository';
import { NotFoundError } from '../utils/errors';

export class AuthService {
  public static signIn(id: string, role: UserRole, key: string) {
    const token = jwt.sign({ id, role }, JWT_SECRET, { expiresIn: AUTH_TIME });
    const refreshToken = jwt.sign({ id, key, role }, JWT_REFRESH_SECRET);

    return {
      token,
      refreshToken,
    };
  }

  public static getAccessToken(id: string, role: UserRole) {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: AUTH_TIME });
  }

  public static async logoutAll(id: string) {
    const jwtControlKey = (await promisify(randomBytes)(32)).toString('hex');

    const user = await UserRepository.findOneById(id);
    if (user === null) throw new NotFoundError('Not Found');

    user.jwtControlKey = jwtControlKey;

    const updateResult = await UserRepository.update(user);
    if (!updateResult) throw new Error('User has not been updated');
  }
}

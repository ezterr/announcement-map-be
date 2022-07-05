import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { UserRole } from '../types';
import { UserRepository } from '../repository/user.repository';
import { NotFoundError } from '../utils/errors';
import { config } from '../config/config';

export class AuthService {
  public static signIn(id: string, role: UserRole, key: string) {
    const token = jwt.sign({ id, role }, config.jwtSecret, { expiresIn: config.jwtAuthTime });
    const refreshToken = jwt.sign({ id, key, role }, config.jwtRefreshSecret);

    return {
      token,
      refreshToken,
    };
  }

  public static getAccessToken(id: string, role: UserRole) {
    return jwt.sign({ id, role }, config.jwtSecret, { expiresIn: config.jwtAuthTime });
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

import passportJWT from 'passport-jwt';
import { compare } from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { AuthError } from '../../utils/errors';
import { UserRepository } from '../../repository/user.repository';

export class PassportStrategy {
  static async verify(username: string, password: string, cb: any) {
    try {
      const result = await UserRepository.findOneByUsername(username);

      if (!result) {
        throw new AuthError('Incorrect username or password.', 'Incorrect username or password.');
      }

      const passwordCompare = await compare(password, result.password as string);

      if (!passwordCompare) {
        throw new AuthError('Incorrect username or password.', 'Incorrect username or password.');
      }

      return cb(null, result);
    } catch (err) {
      return cb(err, null);
    }
  }

  static async verifyJwt(payload: JwtPayload, cb: passportJWT.VerifiedCallback) {
    try {
      return cb(null, payload);
    } catch (err) {
      return cb(err, null, err);
    }
  }

  static async verifyRefreshJwt(payload: JwtPayload, cb: passportJWT.VerifiedCallback) {
    try {
      const result = await UserRepository.findOneById(payload.id);

      if (!result) {
        throw new AuthError('Unauthorized', 'Unauthorized');
      }

      if (result.jwtControlKey === payload.key) return cb(null, result);

      throw new AuthError('Unauthorized', 'Unauthorized');
    } catch (err) {
      return cb(err, null, err);
    }
  }
}

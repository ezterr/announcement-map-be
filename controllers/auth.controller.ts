import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { UserRecord } from '../records/user.record';
import { UserRepository } from '../repository/user.repository';
import { AUTH_TIME, JWT_SECRET, JWT_SECRET_REFRESH } from '../config/secret';
import { ReqUser, SignupUserEntity, UserRole } from '../types';
import { NotFoundError, ValidationError } from '../utils/errors';
import { UserValidation } from '../utils/user-validation';

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    const {
      firstName, lastName, username, email, password,
    } = req.body as SignupUserEntity;

    try {
      const isEmailUniqueness = await UserRepository.checkEmailUniqueness(email);
      const isUsernameUniqueness = await UserRepository.checkUsernameUniqueness(username);

      if (!isEmailUniqueness) {
        throw new ValidationError(
          'Email must be uniqueness.',
          'Email must be uniqueness.',
        );
      }

      if (!isUsernameUniqueness) {
        throw new ValidationError(
          'Username must be uniqueness.',
          'Username must be uniqueness.',
        );
      }

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

      const dbResult = await UserRepository.insert(user);
      if (dbResult === null) throw new Error('User has not been created.');

      const { password: resPassword, jwtControlKey: resJwtControlKey, ...userEntityRes } = dbResult;

      res.status(201).json(userEntityRes);
    } catch (err) {
      next(err);
    }
  }

  static async signIn(req: Request, res: Response) {
    const token = jwt.sign({
      id: (req.user as UserRecord).id,
      role: (req.user as UserRecord).role,
    }, JWT_SECRET, { expiresIn: AUTH_TIME });

    const refreshToken = jwt
      .sign({
        id: (req.user as UserRecord).id,
        key: (req.user as UserRecord).jwtControlKey,
        role: (req.user as UserRecord).role,
      }, JWT_SECRET_REFRESH);

    res.cookie('refreshJwt', refreshToken, { httpOnly: true, secure: false });
    res.json({ token });
  }

  static async getAccessToken(req: Request, res: Response) {
    const token = jwt.sign({
      id: (req.user as UserRecord).id,
      role: (req.user as UserRecord).role,
    }, JWT_SECRET, { expiresIn: AUTH_TIME });

    res.json({ token });
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie('refreshJwt');
    res.json({ message: 'logout' });
  }

  static async logoutAll(req: Request, res: Response) {
    const jwtControlKey = (await promisify(randomBytes)(32)).toString('hex');

    const user = await UserRepository.findOneById((req.user as ReqUser).id);

    if (user === null) throw new NotFoundError('Not Found');

    user.jwtControlKey = jwtControlKey;

    await UserRepository.update(user);
    res.clearCookie('refreshJwt');
    res.json({ message: 'logout from all devices' });
  }
}

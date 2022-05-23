import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { UserForResRecord, UserRecord } from '../records/user.record';
import { UserRepository } from '../repository/user.repository';
import {
  AUTH_REFRESH_TIME, AUTH_TIME, JWT_SECRET, JWT_SECRET_REFRESH,
} from '../config/secret';
import {
  RegisterUserDataReq, ReqUser, UserData, UserRole,
} from '../types';
import { NotFoundError, ValidationError } from '../utils/errors';
import { UserValidation } from '../utils/user-validation';

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    const {
      firstName, lastName, username, email, password, avatar,
    } = req.body as RegisterUserDataReq;

    try {
      const isEmailUniqueness = await UserRepository.checkEmailUniqueness(email);
      const isUsernameUniqueness = await UserRepository.checkUsernameUniqueness(username);

      if (!isEmailUniqueness) {
        throw new ValidationError(
          'Email must be uniqueness',
          'Email must be uniqueness',
        );
      }

      if (!isUsernameUniqueness) {
        throw new ValidationError(
          'Username must be uniqueness',
          'Username must be uniqueness',
        );
      }

      if (!UserValidation.validatePassword(password)) {
        throw new ValidationError(
          'password must contain eight characters, at least one letter and one number',
          'password must contain eight characters, at least one letter and one number',
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
        avatar: avatar || 'default',
        password: hashPassword,
        jwtControlKey,
        role: UserRole.User,
      } as UserData);
      user.validateAllData();

      const dbResult = await UserRepository.insert(user);
      if (dbResult === null) throw new Error('User has not been created.');

      const { password: resPassword, jwtControlKey: resJwtControlKey, ...saveDataForRes } = dbResult;
      const userForRes: UserForResRecord = new UserRecord(saveDataForRes);

      res.status(201).json(userForRes);
    } catch (err) {
      next(err);
    }
  }

  static async signin(req: Request, res: Response) {
    const token = jwt.sign({
      id: (req.user as any).id,
      firstName: (req.user as any).firstName,
      lastName: (req.user as any).lastName,
      username: (req.user as any).username,
      email: (req.user as any).email,
      avatar: (req.user as any).avatar,
      role: (req.user as any).role,
    }, JWT_SECRET, { expiresIn: AUTH_TIME });

    const refreshToken = jwt
      .sign({
        id: (req.user as any).id,
        key: (req.user as any).jwtControlKey,
        role: (req.user as any).role,
      }, JWT_SECRET_REFRESH);

    res.cookie('refreshJwt', refreshToken, {
      httpOnly: true, maxAge: AUTH_REFRESH_TIME, secure: false,
    });
    res.json({ token });
  }

  static async getAccessToken(req: Request, res: Response) {
    const token = jwt.sign({
      id: (req.user as any).id,
      firstName: (req.user as any).firstName,
      lastName: (req.user as any).lastName,
      username: (req.user as any).username,
      email: (req.user as any).email,
      avatar: (req.user as any).avatar,
      role: (req.user as any).role,
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

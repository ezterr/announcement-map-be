import { NextFunction, Request, Response } from 'express';
import { hash, compare } from 'bcrypt';
import { UserRepository } from '../repository/user.repository';
import { AuthError, NotFoundError, ValidationError } from '../utils/errors';
import { UserValidation } from '../utils/user-validation';
import { UserEntityRes, UserUpdateEntity } from '../types';

export class UserController {
  public static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const offset: number | undefined = Number(req.query?.offset !== undefined ? req.query.offset : 0);
    const count: number | undefined = Number(req.query?.count !== undefined ? req.query.count : 100);

    try {
      const users = (await UserRepository.findAll(offset, count)).map((e): UserEntityRes => {
        const { password, jwtControlKey, ...userEntityRes } = e;
        return userEntityRes;
      });

      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  public static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserRepository.findOneById(req.params.userId);

      if (user === null) throw new NotFoundError('Not Found');

      const { password, jwtControlKey, ...userEntityRes } = user;

      res.json(userEntityRes);
    } catch (err) {
      next(err);
    }
  }

  public static async updateUserById(req: Request, res: Response, next: NextFunction) {
    const {
      firstName, lastName, email, newPassword, password, avatar,
    } = req.body as UserUpdateEntity;

    try {
      const user = await UserRepository.findOneById(req.params.userId);
      if (user === null) throw new NotFoundError('Not Found');

      user.firstName = firstName.trim() || user.firstName;
      user.lastName = lastName.trim() || user.lastName;
      user.avatar = avatar.trim() || user.avatar;

      if (newPassword || email !== user.email) {
        const passwordCompareResult = password ? await compare(password, user.password as string) : false;

        if (passwordCompareResult) {
          user.email = email.trim() || user.email;

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
      const result = await UserRepository.update(user);

      if (result) {
        const { password: hashPassword, jwtControlKey, ...userEntityRes } = user;
        res.json(userEntityRes);
      } else {
        throw new Error('Internal server error');
      }
    } catch (err) {
      next(err);
    }
  }

  public static async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const removedUserId = await UserRepository.deleteById(req.params.userId);
      if (!removedUserId) throw new ValidationError('Invalid user id');

      res.send({ removedUserId });
    } catch (err) {
      next(err);
    }
  }
}

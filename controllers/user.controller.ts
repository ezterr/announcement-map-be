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
    const { userId } = req.params;

    try {
      const user = await UserRepository.findOneById(userId);

      if (user === null) throw new NotFoundError(`Not Found user with id: ${userId}`);

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
    const { userId } = req.params;

    try {
      const user = await UserRepository.findOneById(userId);
      if (user === null) throw new NotFoundError(`Not Found user with id: ${userId}`);

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
      const updateResult = await UserRepository.update(user);

      if (!updateResult) throw new Error('User has not been updated');

      const { password: hashPassword, jwtControlKey, ...userEntityRes } = updateResult;
      res.json(userEntityRes);
    } catch (err) {
      next(err);
    }
  }

  public static async deleteUserById(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    try {
      const deleteResult = await UserRepository.deleteById(userId);
      if (!deleteResult) throw new ValidationError('Invalid user id');

      res.json({ id: deleteResult });
    } catch (err) {
      next(err);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repository/user.repository';
import { NotFoundError, ValidationError } from '../utils/errors';
import { CreateUserRecordReq } from '../utils/create-user-record-req';

export class UserController {
  public static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const offset: number | undefined = Number(req.query?.offset !== undefined ? req.query.offset : 0);
    const count: number | undefined = Number(req.query?.count !== undefined ? req.query.count : 100);

    try {
      const users = (await UserRepository.findAll(offset, count)).map((e) => {
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
    const { userId } = req.params;

    try {
      const user = await UserRepository.findOneById(userId);
      if (user === null) throw new NotFoundError(`Not Found user with id: ${userId}`);

      const newUser = await CreateUserRecordReq.updateUser(req, user);
      const updateResult = await UserRepository.update(newUser);

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

import { NextFunction, Request, Response } from 'express';
import { UserForResRecord, UserRecord } from '../records/user.record';
import { UserRepository } from '../repository/user.repository';
import { NotFoundError } from '../utils/errors';

export class UserController {
  public static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const offset: number | undefined = Number(req.query?.offset !== undefined ? req.query.offset : 0);
    const count: number | undefined = Number(req.query?.count !== undefined ? req.query.count : 100);

    try {
      const users = (await UserRepository.findAll(offset, count)).map((e): UserForResRecord => {
        const { password, jwtControlKey, ...saveDataForRes } = e;
        const user = new UserRecord(saveDataForRes);
        user.validateForRes();
        return user;
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

      const { password, jwtControlKey, ...saveDataForRes } = user;
      const userForRes: UserForResRecord = new UserRecord(saveDataForRes);
      userForRes.validateForRes();

      res.json(userForRes);
    } catch (err) {
      next(err);
    }
  }
}

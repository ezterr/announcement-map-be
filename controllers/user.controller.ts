import { NextFunction, Request, Response } from 'express';
import { hash, compare } from 'bcrypt';
import { UserForResRecord, UserRecord } from '../records/user.record';
import { UserRepository } from '../repository/user.repository';
import { AuthError, NotFoundError, ValidationError } from '../utils/errors';
import { UserValidation } from '../utils/user-validation';

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

  public static async updateUserById(req: Request, res: Response, next: NextFunction) {
    const {
      firstName, lastName, email, newPassword, password, avatar,
    } = req.body;

    try {
      const user = await UserRepository.findOneById(req.params.userId);
      if (user === null) throw new NotFoundError('Not Found');

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.avatar = avatar || user.avatar;

      if (!!newPassword || !!email) {
        const passwordCompareResult = password ? await compare(password, user.password as string) : false;
        if (passwordCompareResult) {
          user.email = email || user.email;

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

      const result = await UserRepository.update(user);

      if (result) {
        const { password: hashPassword, jwtControlKey, ...userDataForReq } = user;
        res.json(userDataForReq);
      } else {
        throw new Error('Internal server error');
      }
    } catch (err) {
      next(err);
    }
  }

  // public static async editUserById(req: Request, res: Response, next: NextFunction) {
  //   const {
  //     firstName, lastName, password: reqPassword, avatar,
  //   } = req.body as UserUpdateDataReq;
  //
  //   try {
  //     const user = await UserRepository.findOneById(req.params.userId);
  //     if (user === null) throw new NotFoundError('Not Found');
  //
  //     if (reqPassword) {
  //       if (UserValidation.validatePassword(reqPassword)) user.password = await hash(reqPassword as string, 12);
  //       else {
  //         throw new ValidationError(
  //           'password must contain eight characters, at least one letter and one number',
  //           'password must contain eight characters, at least one letter and one number',
  //           400,
  //         );
  //       }
  //     }
  //
  //     user.firstName = firstName || user.firstName;
  //     user.lastName = lastName || user.lastName;
  //     user.avatar = avatar || user.avatar;
  //     user.validateAllData();
  //
  //     const dbResult = await UserRepository.update(user);
  //     if (dbResult === null) throw new Error('User has not been updated.');
  //
  //     const { password, jwtControlKey, ...saveDataForRes } = dbResult;
  //     const userForRes: UserForResRecord = new UserRecord(saveDataForRes);
  //     userForRes.validateForRes();
  //
  //     res.json(saveDataForRes);
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}

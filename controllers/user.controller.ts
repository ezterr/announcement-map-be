import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AnnouncementService } from '../services/announcement.service';

export class UserController {
  public static async getUsers(req: Request, res: Response, next: NextFunction) {
    const offset: number | undefined = Number(req.query?.offset !== undefined ? req.query.offset : 0);
    const count: number | undefined = Number(req.query?.count !== undefined ? req.query.count : 100);

    try {
      const users = UserService.getUsers(offset, count);

      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  public static async getUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    try {
      const user = await UserService.getUser(userId);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const createdUser = await UserService.createUser(req.body);

      res.status(201).json(createdUser);
    } catch (err) {
      next(err);
    }
  }

  public static async updateUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    try {
      const updatedUser = await UserService.updateUser(userId, req.body);

      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  public static async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    try {
      const deleteResult = await UserService.deleteUser(userId);

      res.json({ id: deleteResult });
    } catch (err) {
      next(err);
    }
  }

  public static async getUserAnnouncements(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    try {
      const userAnnouncements = await AnnouncementService.getAnnouncementByUserId(userId);

      res.json(userAnnouncements);
    } catch (err) {
      next(err);
    }
  }
}

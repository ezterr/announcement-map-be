import { NextFunction, Request, Response } from 'express';
import { AnnouncementService } from '../services/announcement.service';
import { UserRequest } from '../types';

export class AnnouncementController {
  public static async getAnnouncements(req: Request, res: Response, next: NextFunction) {
    const { search } = req.query;

    try {
      const announcements = await AnnouncementService.getAnnouncements(search as string || '');

      res.json(announcements);
    } catch (err) {
      next(err);
    }
  }

  public static async getAnnouncement(req: Request, res: Response, next: NextFunction) {
    const { announcementId } = req.params;

    try {
      const announcement = await AnnouncementService.getAnnouncement(announcementId);

      res.json(announcement);
    } catch (err) {
      next(err);
    }
  }

  public static async createAnnouncement(req: Request, res: Response, next: NextFunction) {
    const { id: userId } = req.user as UserRequest;

    try {
      const newAnnouncement = AnnouncementService.createAnnouncement(req.body, userId);
      res.json(newAnnouncement);
    } catch (err) {
      next(err);
    }
  }

  public static async updateAnnouncement(req: Request, res: Response, next: NextFunction) {
    const { announcementId } = req.params;

    try {
      const updatedAnnouncement = AnnouncementService.updateAnnouncement(announcementId, req.body);
      res.json(updatedAnnouncement);
    } catch (err) {
      next(err);
    }
  }

  public static async deleteAnnouncement(req: Request, res: Response, next: NextFunction) {
    const { announcementId } = req.params;

    try {
      const deleteResult = await AnnouncementService.deleteAnnouncement(announcementId);

      res.json({ id: deleteResult });
    } catch (err) {
      next(err);
    }
  }
}

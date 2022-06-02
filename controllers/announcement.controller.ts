import { Request, Response } from 'express';
import { AnnouncementRepository } from '../repository/announcement.repository';

export class AnnouncementController {
  public static async getAnnouncements(req: Request, res: Response) {
    const { search } = req.query;
    const announcements = await AnnouncementRepository.findAll(search as string || '');
  }
}

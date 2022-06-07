import { NextFunction, Request, Response } from 'express';
import { AnnouncementRepository } from '../repository/announcement.repository';
import { AnnouncementEntitySimple } from '../types';
import { NotFoundError } from '../utils/errors';
import { AuctionLinkRepository } from '../repository/auction-link.repository';
import { CreateAnnouncementRecordReq } from '../utils/create-announcement-record-req';
import { auctionLinkRecordsList } from '../utils/auction-link-records-list';

export class AnnouncementController {
  public static async getAnnouncements(req: Request, res: Response, next: NextFunction) {
    const { search } = req.query;
    try {
      const announcements = await AnnouncementRepository.findAll(search as string || '');

      const resData = announcements.map((e): AnnouncementEntitySimple => ({
        id: e.id,
        lat: e.lat,
        lon: e.lon,
      }));

      res.json(resData);
    } catch (err) {
      next(err);
    }
  }

  public static async getAnnouncement(req: Request, res: Response, next: NextFunction) {
    const { announcementId } = req.params;

    try {
      const announcement = await AnnouncementRepository.findById(announcementId);
      if (!announcement) throw new NotFoundError(`Not found announcement with id: ${announcementId}`);

      const auctionLinks = await AuctionLinkRepository.findByAnnouncementId(announcementId);

      res.json({ ...announcement, auctionLinks: [...auctionLinks] });
    } catch (err) {
      next(err);
    }
  }

  public static async addAnnouncement(req: Request, res: Response, next: NextFunction) {
    const { auctionLinks } = req.body;

    try {
      const announcement = CreateAnnouncementRecordReq.createAnnouncement(req);
      const auctionLinkRecords = auctionLinkRecordsList(auctionLinks, announcement.id);

      const insertResult = await AnnouncementRepository.insert(announcement);
      if (insertResult === null) throw new Error('Announcement has not been created');

      for await (const auctionLinkRecord of auctionLinkRecords) {
        const insertAuctionLinkResult = await AuctionLinkRepository.insert(auctionLinkRecord);
        if (insertAuctionLinkResult === null) throw new Error('Announcement has not been created');
      }

      res.json({ ...insertResult, auctionLinks: [...auctionLinkRecords] });
    } catch (err) {
      next(err);
    }
  }

  public static async updateById(req: Request, res: Response, next: NextFunction) {
    const { auctionLinks } = req.body;
    const { announcementId } = req.params;

    try {
      const announcement = await AnnouncementRepository.findById(announcementId);
      if (!announcement) throw new NotFoundError(`Not found user with id: ${announcementId}`);

      const newAnnouncement = CreateAnnouncementRecordReq.updateAnnouncement(req, announcement);
      const auctionLinkRecords = auctionLinkRecordsList(auctionLinks, newAnnouncement.id);

      const updateResult = await AnnouncementRepository.updateById(newAnnouncement);
      if (!updateResult) throw new Error('Announcement has not been');

      const deleteLinksResult = await AuctionLinkRepository.deleteByAnnouncementId(announcementId);
      for await (const auctionLinkRecord of auctionLinkRecords) {
        const insertAuctionLinkResult = await AuctionLinkRepository.insert(auctionLinkRecord);
        if (insertAuctionLinkResult === null) throw new Error('Announcement has not been created');
      }

      res.json({ ...updateResult, auctionLinks: [...auctionLinkRecords] });
    } catch (err) {
      next(err);
    }
  }

  public static async deleteById(req: Request, res: Response, next: NextFunction) {
    const { announcementId } = req.params;

    try {
      const deleteResult = await AnnouncementRepository.deleteById(announcementId);
      if (!deleteResult) throw new Error('Announcement has not been deleted');

      const deleteLinksResult = await AuctionLinkRepository.deleteByAnnouncementId(announcementId);

      res.json({ id: deleteResult });
    } catch (err) {
      next(err);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { AnnouncementRepository } from '../repository/announcement.repository';
import { AnnouncementEntitySimple, AuctionLinkEntitySimple, ReqUser } from '../types';
import { NotFoundError, ValidationError } from '../utils/errors';
import { AnnouncementRecord } from '../records/announcement.record';
import { AuctionLinkRecord } from '../records/auction-link.record';
import { AuctionLinkRepository } from '../repository/auction-link.repository';

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

      res.json(announcement);
    } catch (err) {
      next(err);
    }
  }

  public static async addAnnouncement(req: Request, res: Response, next: NextFunction) {
    const {
      title,
      description,
      price,
      lat,
      lon,
      country,
      city,
      zipCode,
      street,
      buildingNumber,
      apartamentNumber,
      auctionLinks,
      category,
    } = req.body;

    const announcement = new AnnouncementRecord({
      id: uuid(),
      title: String(title).trim(),
      description: String(description).trim(),
      price: Number(price) || 0,
      createdAt: new Date(),
      createdBy: (req.user as ReqUser).id,
      lat: Number(lat),
      lon: Number(lon),
      country: String(country).trim(),
      city: String(city).trim(),
      zipCode: String(zipCode).trim(),
      street: street ? String(street).trim() : null,
      buildingNumber: buildingNumber ? String(buildingNumber).trim() : null,
      apartamentNumber: apartamentNumber ? String(apartamentNumber).trim() : null,
      category,
    });

    try {
      announcement.validate();
      const auctionLinkRecords = auctionLinks.map((e: AuctionLinkEntitySimple) => {
        const auctionLink = new AuctionLinkRecord({
          id: uuid(),
          name: e.name || '',
          url: e.url || '',
          announcementId: announcement.id,
        });
        auctionLink.validate();

        return auctionLink;
      }) as AuctionLinkRecord[];

      if (auctionLinkRecords.length > 5) {
        throw new ValidationError(
          'you can add up to 5 auction links',
          'you can add up to 5 auction links',
        );
      }

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
    const {
      title, description, price, lat, lon, country, city, zipCode, street, buildingNumber, apartamentNumber, category,
    } = req.body;
    const { announcementId } = req.params;

    try {
      const announcement = await AnnouncementRepository.findById(announcementId);
      if (!announcement) throw new NotFoundError(`Not found user with id: ${announcementId}`);

      announcement.title = String(title).trim() || announcement.title;
      announcement.description = String(description).trim() || announcement.description;
      announcement.price = price || Number(price) === 0 ? Number(price) : announcement.price;
      announcement.lat = lat || Number(lat) === 0 ? Number(lat) : announcement.lat;
      announcement.lon = lon || Number(lon) === 0 ? Number(lon) : announcement.lon;
      announcement.country = String(country).trim() || announcement.country;
      announcement.city = String(city).trim() || announcement.city;
      announcement.zipCode = String(zipCode).trim() || announcement.zipCode;
      announcement.street = street ? String(street).trim() : null;
      announcement.buildingNumber = buildingNumber ? String(buildingNumber).trim() : null;
      announcement.apartamentNumber = apartamentNumber ? String(apartamentNumber).trim() : null;
      announcement.category = category || announcement.category;
      announcement.validate();

      const updateResult = await AnnouncementRepository.updateById(announcement);
      if (!updateResult) throw new Error('Announcement has not been');

      res.json(updateResult);
    } catch (err) {
      next(err);
    }
  }

  public static async deleteById(req: Request, res: Response, next: NextFunction) {
    const { announcementId } = req.params;

    try {
      const deleteResult = await AnnouncementRepository.deleteById(announcementId);

      if (!deleteResult) throw new Error('Announcement has not been deleted');

      res.json({ id: deleteResult });
    } catch (err) {
      next(err);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { AnnouncementRepository } from '../repository/announcement.repository';
import { AnnouncementEntitySimple, ReqUser } from '../types';
import { NotFoundError } from '../utils/errors';
import { AnnouncementRecord } from '../records/announcement.record';

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
      title, description, price, lat, lon, country, city, zipCode, street, buildingNumber, apartamentNumber,
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
    });

    try {
      announcement.validate();

      const insertResult = await AnnouncementRepository.insert(announcement);
      if (insertResult === null) throw new Error('Announcement has not been created');

      res.json(insertResult);
    } catch (err) {
      next(err);
    }
  }

  public static async updateById(req: Request, res: Response, next: NextFunction) {
    const {
      title, description, price, lat, lon, country, city, zipCode, street, buildingNumber, apartamentNumber,
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

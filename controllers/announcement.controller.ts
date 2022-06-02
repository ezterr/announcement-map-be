import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { AnnouncementRepository } from '../repository/announcement.repository';
import { AnnouncementEntity, AnnouncementEntitySimple, ReqUser } from '../types';
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
      name, description, price, lat, lon, country, city, zipCode, street, buildingNumber, apartamentNumber,
    } = req.body;

    const announcement = new AnnouncementRecord({
      id: uuid(),
      name: name.trim(),
      description: description.trim(),
      price: price || 0,
      createdAt: new Date(),
      createdBy: (req.user as ReqUser).id,
      lat: lat || 0,
      lon: lon || 0,
      country: country.trim(),
      city: city.trim(),
      zipCode: zipCode.trim(),
      street: street.trim() || null,
      buildingNumber: buildingNumber.trim() || null,
      apartamentNumber: apartamentNumber.trim() || null,
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
      name, description, price, lat, lon, country, city, zipCode, street, buildingNumber, apartamentNumber,
    } = req.body;
    const { announcementId } = req.params;

    try {
      const announcement = await AnnouncementRepository.findById(announcementId);
      if (!announcement) throw new NotFoundError(`Not found user with id: ${announcementId}`);

      announcement.name = name || announcement.name;
      announcement.description = description || announcement.description;
      announcement.price = price !== '' && price !== undefined ? price : announcement.price;
      announcement.lat = lat !== '' && lat !== undefined ? lat : announcement.lat;
      announcement.lon = lon !== '' && lon !== undefined ? lon : announcement.lon;
      announcement.country = country || announcement.country;
      announcement.city = city || announcement.city;
      announcement.zipCode = zipCode || announcement.zipCode;
      announcement.street = street || announcement.street;
      announcement.buildingNumber = buildingNumber || announcement.buildingNumber;
      announcement.apartamentNumber = apartamentNumber || announcement.apartamentNumber;
      announcement.validate();

      const updateResult = await AnnouncementRepository.update(announcement);
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

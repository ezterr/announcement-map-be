import { Request } from 'express';
import { v4 as uuid } from 'uuid';
import { AnnouncementRecord } from '../records/announcement.record';
import { ReqUser } from '../types';

export class CreateAnnouncementRecordReq {
  public static CreateAnnouncement(req: Request): AnnouncementRecord {
    const { body, user } = req;
    const {
      title, description, price, categoryId, lat, lon, country, city, zipCode, street, buildingNumber, apartamentNumber,
    } = body;

    const announcement = new AnnouncementRecord({
      id: uuid(),
      title: String(title).trim(),
      description: String(description).trim(),
      price: Number(price) || 0,
      categoryId: categoryId.trim(),
      createdAt: new Date(),
      createdBy: (user as ReqUser).id,
      lat: Number(lat),
      lon: Number(lon),
      country: String(country).trim(),
      city: String(city).trim(),
      zipCode: String(zipCode).trim(),
      street: street ? String(street).trim() : null,
      buildingNumber: buildingNumber ? String(buildingNumber).trim() : null,
      apartamentNumber: apartamentNumber ? String(apartamentNumber).trim() : null,
    });
    announcement.validate();

    return announcement;
  }

  public static UpdateAnnouncement(req: Request, oldAnnouncement: AnnouncementRecord): AnnouncementRecord {
    const { body } = req;
    const {
      title, description, price, categoryId, lat, lon, country, city, zipCode, street, buildingNumber, apartamentNumber,
    } = body;

    const announcement = new AnnouncementRecord(oldAnnouncement);

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
    announcement.categoryId = categoryId || announcement.categoryId;
    announcement.validate();

    return announcement;
  }
}

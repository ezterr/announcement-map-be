import { v4 as uuid } from 'uuid';
import { AnnouncementRecord } from '../../records/announcement.record';
import { AnnouncementDto } from '../../types';

export class CreateAnnouncementRecord {
  public static createAnnouncementRecord(body: AnnouncementDto, userId: string): AnnouncementRecord {
    const {
      title, description, price, categoryId, lat, lon, country, city, zipCode, street, buildingNumber, apartamentNumber,
    } = body;

    const announcement = new AnnouncementRecord({
      id: uuid(),
      title,
      description,
      price: Number(price),
      categoryId,
      createdAt: new Date(),
      createdBy: userId,
      lat: Number(lat),
      lon: Number(lon),
      country,
      city,
      zipCode,
      street: street || null,
      buildingNumber: buildingNumber || null,
      apartamentNumber: apartamentNumber || null,
    });

    announcement.validate();

    return announcement;
  }

  public static updateAnnouncementRecord(body: AnnouncementDto, oldAnnouncement: AnnouncementRecord):
    AnnouncementRecord {
    const {
      title, description, price, categoryId, lat, lon, country, city, zipCode, street, buildingNumber, apartamentNumber,
    } = body;

    const announcement = new AnnouncementRecord(oldAnnouncement);

    announcement.title = title !== undefined ? String(title) : announcement.title;
    announcement.description = description !== undefined ? String(description) : announcement.description;
    announcement.price = price !== undefined ? Number(price) : announcement.price;
    announcement.lat = lat !== undefined ? Number(lat) : announcement.lat;
    announcement.lon = lon !== undefined ? Number(lon) : announcement.lon;
    announcement.country = country !== undefined ? String(country) : announcement.country;
    announcement.city = city !== undefined ? String(city) : announcement.city;
    announcement.zipCode = zipCode !== undefined ? String(zipCode) : announcement.zipCode;
    announcement.street = street !== undefined ? String(street) : announcement.street;
    announcement.buildingNumber = buildingNumber !== undefined ? String(buildingNumber) : announcement.buildingNumber;
    announcement.apartamentNumber = apartamentNumber !== undefined ? String(apartamentNumber) : announcement.apartamentNumber;
    announcement.categoryId = categoryId !== undefined ? String(categoryId) : announcement.categoryId;
    announcement.validate();

    return announcement;
  }
}

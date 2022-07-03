import { v4 as uuid } from 'uuid';
import { AnnouncementRecord } from '../../records/announcement.record';
import { AnnouncementDto } from '../../types';
import { DataConversion } from '../data-conversion';

export class CreateAnnouncementRecord {
  public static createAnnouncementRecord(announcementData: AnnouncementDto, userId: string): AnnouncementRecord {
    const {
      title, description, price, categoryId, lat, lon, country, city, zipCode, street, buildingNumber, apartamentNumber,
    } = announcementData;

    const announcement = new AnnouncementRecord({
      id: uuid(),
      title,
      description,
      price: Number(price),
      categoryId,
      createdAt: new Date(),
      createdBy: userId,
      views: 0,
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

  public static updateAnnouncementRecord(announcementData: AnnouncementDto, oldAnnouncement: AnnouncementRecord):
    AnnouncementRecord {
    const {
      title, description, price, categoryId, lat, lon, country, city, zipCode, street, buildingNumber, apartamentNumber,
    } = announcementData;

    const announcement = new AnnouncementRecord(oldAnnouncement);

    announcement.title = title !== undefined ? title : announcement.title;
    announcement.description = description !== undefined ? description : announcement.description;
    announcement.price = price !== undefined ? Number(price) : announcement.price;
    announcement.lat = lat !== undefined ? Number(lat) : announcement.lat;
    announcement.lon = lon !== undefined ? Number(lon) : announcement.lon;
    announcement.categoryId = categoryId !== undefined ? categoryId : announcement.categoryId;
    announcement.country = country !== undefined ? country : announcement.country;
    announcement.city = city !== undefined ? city : announcement.city;
    announcement.zipCode = zipCode !== undefined ? zipCode : announcement.zipCode;
    announcement.street = street !== undefined
      ? DataConversion.setNullIfEmpty(street)
      : announcement.street;
    announcement.buildingNumber = buildingNumber !== undefined
      ? DataConversion.setNullIfEmpty(buildingNumber)
      : announcement.buildingNumber;
    announcement.apartamentNumber = apartamentNumber !== undefined
      ? DataConversion.setNullIfEmpty(apartamentNumber)
      : announcement.apartamentNumber;
    announcement.validate();

    return announcement;
  }
}

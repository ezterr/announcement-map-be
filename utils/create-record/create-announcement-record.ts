import { v4 as uuid } from 'uuid';
import { AnnouncementRecord } from '../../records/announcement.record';
import { CreateAnnouncementDto } from '../../types/dto/create-announcement.dto';

export class CreateAnnouncementRecord {
  public static createAnnouncementRecord(body: CreateAnnouncementDto, userId: string): AnnouncementRecord {
    const {
      title, description, price, categoryId, lat, lon, country, city, zipCode, street, buildingNumber, apartamentNumber,
    } = body;

    const announcement = new AnnouncementRecord({
      id: uuid(),
      title: title || '',
      description: description || '',
      price: price ? Number(price) : 0,
      categoryId: categoryId || '',
      createdAt: new Date(),
      createdBy: userId,
      lat: lat ? Number(lat) : 0,
      lon: lon ? Number(lon) : 0,
      country: country || '',
      city: city || '',
      zipCode: zipCode || '',
      street: street || null,
      buildingNumber: buildingNumber || null,
      apartamentNumber: apartamentNumber || null,
    });
    announcement.validate();

    return announcement;
  }

  public static updateAnnouncementRecord(body: CreateAnnouncementDto, oldAnnouncement: AnnouncementRecord):
    AnnouncementRecord {
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

import { AnnouncementEntity } from '../types';
import { ValidationError } from '../utils/errors';
import { AnnouncementValidation } from '../utils/validation/announcement-validation';

export class AnnouncementRecord implements AnnouncementEntity {
  public id: string;
  public title: string;
  public description: string;
  public price: number;
  public categoryId: string;
  public createdAt: Date;
  public createdBy: string;
  public lat: number;
  public lon: number;
  public country: string;
  public city: string;
  public zipCode: string;
  public street: string | null;
  public buildingNumber: string | null;
  public apartamentNumber: string | null;

  constructor(announcement: AnnouncementEntity) {
    this.id = announcement.id;
    this.title = announcement.title;
    this.description = announcement.description;
    this.price = announcement.price;
    this.categoryId = announcement.categoryId;
    this.createdAt = announcement.createdAt;
    this.createdBy = announcement.createdBy;
    this.lat = announcement.lat;
    this.lon = announcement.lon;
    this.country = announcement.country;
    this.city = announcement.city;
    this.zipCode = announcement.zipCode;
    this.street = announcement.street;
    this.buildingNumber = announcement.buildingNumber;
    this.apartamentNumber = announcement.apartamentNumber;
  }

  public validate() {
    if (!AnnouncementValidation.validateId(this.id)) {
      throw new ValidationError(`Incorrect id. Id: ${this.id} in: ${this.title}`);
    }

    if (!AnnouncementValidation.validateTitle(this.title)) {
      throw new ValidationError(
        'Title must contain at least 3 characters.',
        'Title must contain at least 3 characters.',
      );
    }

    if (!AnnouncementValidation.validateDescription(this.description)) {
      throw new ValidationError(
        'Description must contain at least 3 characters and less than 128.',
        'Description must contain at least 3 characters and less than 128.',
      );
    }

    if (!AnnouncementValidation.validatePrice(this.price)) {
      throw new ValidationError(
        'Price can be greater or equal to 0 and less than 10 000 000 000',
        'Price can be greater or equal to 0 and less than 10 000 000 000',
      );
    }

    if (!AnnouncementValidation.validateCategory(this.categoryId)) {
      throw new ValidationError(
        `Incorrect category id from announcement ${this.id}`,
        'Incorrect category id.',
      );
    }

    if (!AnnouncementValidation.validateDate(this.createdAt)) {
      throw new Error('Date is not instance of Date.');
    }

    if (!AnnouncementValidation.validateId(this.createdBy)) {
      throw new Error(`Incorrect createdBy id. Announcement id: ${this.id}`);
    }

    if (!AnnouncementValidation.validateCoordinate(this.lat)) {
      throw new ValidationError(
        'Latitude should be between -180 and 180',
        'Latitude should be between -180 and 180',
      );
    }

    if (!AnnouncementValidation.validateCoordinate(this.lon)) {
      throw new ValidationError(
        'Longitude should be between -180 and 180',
        'Longitude should be between -180 and 180',
      );
    }

    if (!AnnouncementValidation.validateCountry(this.country)) {
      throw new ValidationError(
        'Country must contain at least 2 characters and less than 60.',
        'Country must contain at least 2 characters and less than 60.',
      );
    }

    if (!AnnouncementValidation.validateCity(this.city)) {
      throw new ValidationError(
        'City must contain at least 2 characters and less than 90 or null.',
        'City must contain at least 2 characters and less than 90 or null.',
      );
    }

    if (!AnnouncementValidation.validateZipCode(this.zipCode)) {
      throw new ValidationError(
        'Zip-code must contain at least 2 characters and less than 10 or null.',
        'Zip-code must contain at least 2 characters and less than 10 or null.',
      );
    }

    if (!AnnouncementValidation.validateStreet(this.street)) {
      throw new ValidationError(
        'Street must contain at least 2 characters and less than 90 or null.',
        'Street must contain at least 2 characters and less than 90 or null.',
      );
    }

    if (!AnnouncementValidation.validateBuildingNumber(this.buildingNumber)) {
      throw new ValidationError(
        'Building number must contain at least 1 characters and less than 20 or null.',
        'Building number must contain at least 1 characters and less than 20 or null.',
      );
    }

    if (!AnnouncementValidation.validateBuildingNumber(this.buildingNumber)) {
      throw new ValidationError(
        'City must contain at least 1 characters and less than 20 or null.',
        'City must contain at least 1 characters and less than 20 or null.',
      );
    }

    if (!AnnouncementValidation.validateApartamentNumber(this.apartamentNumber)) {
      throw new ValidationError(
        'Apartament number must contain at least 1 characters and less than 20 or null.',
        'Apartament number must contain at least 1 characters and less than 20 or null.',
      );
    }
  }
}

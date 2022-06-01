import { AnnouncementEntity } from '../types';
import { UserValidation } from '../utils/user-validation';
import { ValidationError } from '../utils/errors';
import { AnnouncementValidation } from '../utils/announcement-validation';

export class AnnouncementRecord implements AnnouncementEntity {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public createdAt: Date;
  public country: string;
  public city: string | null;
  public zipCode: string | null;
  public street: string | null;
  public buildingNumber: string | null;

  constructor(announcement: AnnouncementRecord) {
    this.id = announcement.id;
    this.name = announcement.name;
    this.description = announcement.description;
    this.price = announcement.price;
    this.createdAt = announcement.createdAt;
    this.country = announcement.country;
    this.city = announcement.city;
    this.zipCode = announcement.zipCode;
    this.street = announcement.street;
    this.buildingNumber = announcement.buildingNumber;
  }

  public validate() {
    if (!AnnouncementValidation.validateId(this.id)) {
      throw new ValidationError(`Incorrect id. Id: ${this.id} in: ${this.name}`);
    }

    if (!AnnouncementValidation.validateName(this.name)) {
      throw new ValidationError(
        'Name must contain at least 3 characters.',
        'Name must contain at least 3 characters.',
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

    if (!AnnouncementValidation.validateDate(this.createdAt)) {
      throw new Error('Date is not instance of Date');
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
        'City must contain at least 2 characters and less than 90 or null.',
        'City must contain at least 2 characters and less than 90 or null.',
      );
    }

    if (!AnnouncementValidation.validateBuildingNumber(this.buildingNumber)) {
      throw new ValidationError(
        'City must contain at least 1 characters and less than 20 or null.',
        'City must contain at least 1 characters and less than 20 or null.',
      );
    }
  }
}

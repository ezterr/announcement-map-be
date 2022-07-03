export class AnnouncementValidation {
  public static validateId(id: string | undefined) {
    return !!(
      id
      && typeof id === 'string'
      && id.length === 36
    );
  }

  public static validateTitle(title: string): boolean {
    return !!(
      title
      && typeof title === 'string'
      && title.trim().length >= 3
      && title.length <= 128
    );
  }

  public static validateDescription(description: string): boolean {
    return !!(
      description
      && typeof description === 'string'
      && description.trim().length >= 3
      && description.length <= 255
    );
  }

  public static validateCategory(category: string): boolean {
    return !!(
      category
      && typeof category === 'string'
      && category.trim().length >= 3
      && category.length <= 255
    );
  }

  public static validatePrice(price: number): boolean {
    return (
      typeof price === 'number'
      && !Number.isNaN(price)
      && price >= 0
      && price <= 9999999999.99
    );
  }

  public static validateDate(date: Date): boolean {
    return !!(date instanceof Date);
  }

  public static validateCountry(country: string): boolean {
    return !!(country
      && typeof country === 'string'
      && country.trim().length >= 2
      && country.length <= 60
    );
  }

  public static validateCity(city: string): boolean {
    return !!(city
      && typeof city === 'string'
      && city.trim().length >= 2
      && city.length <= 90
    );
  }

  public static validateZipCode(zipCode: string): boolean {
    return !!(
      zipCode
      && typeof zipCode === 'string'
      && zipCode.trim().length >= 2
      && zipCode.length <= 10
    );
  }

  public static validateStreet(street: string | null): boolean {
    if (street === null) return true;

    return !!(
      street
      && typeof street === 'string'
      && street.trim().length >= 2
      && street.length <= 90
    );
  }

  public static validateBuildingNumber(buildingNumber: string | null): boolean {
    if (buildingNumber === null) return true;

    return !!(
      buildingNumber
      && typeof buildingNumber === 'string'
      && buildingNumber.trim().length >= 1
      && buildingNumber.length <= 20
    );
  }

  public static validateApartamentNumber(apartamentNumber: string | null): boolean {
    if (apartamentNumber === null) return true;

    return !!(
      apartamentNumber
      && typeof apartamentNumber === 'string'
      && apartamentNumber.length >= 1
      && apartamentNumber.length <= 20
    );
  }

  public static validateCoordinate(coordinate: number): boolean {
    return (
      typeof coordinate === 'number'
      && coordinate >= -180
      && coordinate <= 180
      && !Number.isNaN(coordinate)
    );
  }

  public static validateViews(views: number): boolean {
    return (
      typeof views === 'number'
      && views >= 0
      && views <= 99999999999
      && !Number.isNaN(views)
    );
  }
}

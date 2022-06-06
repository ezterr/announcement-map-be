export class AnnouncementValidation {
  public static validateId(id: string | undefined) {
    return !!(id && id.length === 36);
  }

  public static validateTitle(name: string): boolean {
    return !!(name && name.length >= 3 && name.length <= 128);
  }

  public static validateDescription(description: string): boolean {
    return !!(description && description.length >= 3 && description.length <= 255);
  }

  public static validatePrice(price: number): boolean {
    return !!(price >= 0 && price <= 9999999999.99 && !Number.isNaN(price));
  }

  public static validateDate(date: Date): boolean {
    return !!(date instanceof Date);
  }

  public static validateCountry(country: string): boolean {
    return !!(country && country.length >= 2 && country.length <= 60);
  }

  public static validateCity(city: string): boolean {
    return !!(city && city.length >= 2 && city.length <= 90);
  }

  public static validateZipCode(zipCode: string): boolean {
    return !!(zipCode && zipCode.length >= 2 && zipCode.length <= 10);
  }

  public static validateStreet(street: string | null): boolean {
    if (street === null) return true;

    return !!(street && street.length >= 2 && street.length <= 90);
  }

  public static validateBuildingNumber(buildingNumber: string | null): boolean {
    if (buildingNumber === null) return true;

    return !!(buildingNumber && buildingNumber.length >= 1 && buildingNumber.length <= 20);
  }

  public static validateApartamentNumber(apartamentNumber: string | null): boolean {
    if (apartamentNumber === null) return true;

    return !!(apartamentNumber && apartamentNumber.length >= 1 && apartamentNumber.length <= 20);
  }

  public static validateCoordinate(coordinate: number): boolean {
    return !!(coordinate >= -180 && coordinate <= 180 && !Number.isNaN(coordinate));
  }
}

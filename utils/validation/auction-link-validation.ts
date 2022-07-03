export class AuctionLinkValidation {
  public static validateId(id: string) {
    return !!(
      id
      && typeof id === 'string'
      && id.length === 36
    );
  }

  public static urlValidate(url: string) {
    return !!(
      url
      && typeof url === 'string'
      && url.trim().length >= 10
      && url.length <= 255
    );
  }

  public static nameValidate(name: string) {
    return !!(
      name
      && typeof name === 'string'
      && name.trim().length >= 1
      && name.length <= 20
    );
  }
}

export class AuctionLinkValidation {
  public static validateId(id: string) {
    return !!(id && id.length === 36);
  }

  public static urlValidate(url: string) {
    return !!(url && url.length >= 10 && url.length <= 255);
  }

  public static nameValidate(name: string) {
    return !!(name && name.length >= 1 && name.length <= 20);
  }
}

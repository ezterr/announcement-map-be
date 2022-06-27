import { AuctionLinkEntity } from '../types';
import { AuctionLinkValidation } from '../utils/validation/auction-link-validation';
import { ValidationError } from '../utils/errors';

export class AuctionLinkRecord implements AuctionLinkEntity {
  public id: string;
  public name: string;
  public url: string;
  public announcementId: string;

  constructor(auctionLink: AuctionLinkEntity) {
    this.id = auctionLink.id;
    this.name = auctionLink.name;
    this.url = auctionLink.url;
    this.announcementId = auctionLink.announcementId;
  }

  public validate() {
    if (!AuctionLinkValidation.validateId(this.id)) {
      throw new Error(`Invalid link id: ${this.id}`);
    }

    if (!AuctionLinkValidation.validateId(this.announcementId)) {
      throw new Error(`Invalid announcement id: ${this.id}`);
    }

    if (!AuctionLinkValidation.nameValidate(this.name)) {
      throw new ValidationError(`invalid auction name: ${this.name}`, `invalid auction name: ${this.name}`);
    }

    if (!AuctionLinkValidation.urlValidate(this.url)) {
      throw new ValidationError(`invalid url of ${this.id}`, `invalid url of ${this.name}`);
    }
  }
}

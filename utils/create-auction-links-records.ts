import { v4 as uuid } from 'uuid';
import { AuctionLinkEntitySimple } from '../types';
import { AuctionLinkRecord } from '../records/auction-link.record';
import { ValidationError } from './errors';

export function createAuctionLinksRecords(auctionLinks: AuctionLinkEntitySimple[], announcementId: string): AuctionLinkRecord[] {
  if (auctionLinks.length > 5) {
    throw new ValidationError(
      'you can add up to 5 auction links',
      'you can add up to 5 auction links',
    );
  }

  return auctionLinks
    ? auctionLinks.map((e: AuctionLinkEntitySimple) => {
      const auctionLink = new AuctionLinkRecord({
        id: uuid(),
        name: e.name || '',
        url: e.url || '',
        announcementId,
      });
      auctionLink.validate();

      return auctionLink;
    }) as AuctionLinkRecord[]
    : [];
}

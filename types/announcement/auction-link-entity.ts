export interface AuctionLinkEntity {
  id: string;
  announcementId: string;
  name: string;
  url: string;
}

export type AuctionLinkEntityRes = Omit<AuctionLinkEntity, 'announcementId'>

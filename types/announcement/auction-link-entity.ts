export interface AuctionLinkEntity {
  id: string;
  announcementId: string;
  name: string;
  url: string;
}

export type AuctionLinkEntitySave = Omit<AuctionLinkEntity, 'announcementId' | 'id'>

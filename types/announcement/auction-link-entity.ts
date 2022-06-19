export interface AuctionLinkEntity {
  id: string;
  announcementId: string;
  name: string;
  url: string;
}

export interface AuctionLinkSave {
  name: string;
  url: string;
}

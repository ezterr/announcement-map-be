import { AuctionLinkEntity } from './auction-link-entity';

export interface AnnouncementEntity {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  createdAt: Date;
  createdBy: string;
  lat: number;
  lon: number;
  country: string;
  city: string;
  zipCode: string;
  street: string | null;
  buildingNumber: string | null;
  apartamentNumber: string | null;
}

export interface AnnouncementEntityUser {
  id: string;
  createdBy: string;
}

export interface AnnouncementEntitySimpleResponse {
  id: string;
  lat: number;
  lon: number;
}

interface AnnouncementEntityResponse extends Omit<AnnouncementEntity, 'createdAt'> {
  createdAt: string;
}

export type GetUserAnnouncementsResponse = AnnouncementEntityResponse[];
export type GetAnnouncementsResponse = AnnouncementEntitySimpleResponse[];
export type GetAnnouncementResponse = AnnouncementEntityResponse & {auctionLinks: AuctionLinkEntity[]};
export type CreateAnnouncementResponse = AnnouncementEntityResponse & {auctionLinks: AuctionLinkEntity[]};
export type UpdateAnnouncementResponse = AnnouncementEntityResponse & {auctionLinks: AuctionLinkEntity[]};
export type DeleteAnnouncementResponse = {id: string};

export type GetUserAnnouncements = AnnouncementEntity[];
export type GetAnnouncements = AnnouncementEntitySimpleResponse[];
export type GetAnnouncement = AnnouncementEntity & {auctionLinks: AuctionLinkEntity[]};
export type CreateAnnouncement = AnnouncementEntity & {auctionLinks: AuctionLinkEntity[]};
export type UpdateAnnouncement = AnnouncementEntity & {auctionLinks: AuctionLinkEntity[]};
export type DeleteAnnouncement = {id: string};

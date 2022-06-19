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

export type AnnouncementEntityResponse = AnnouncementEntity & {auctionLinks: AuctionLinkEntity[]};

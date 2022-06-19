import { CreateAuctionLinkDto } from './create-auction-link.dto';

export interface CreateAnnouncementDto {
  title: string;
  description: string;
  price: number;
  categoryId: string;
  lat: number;
  lon: number;
  country: string;
  city: string;
  zipCode: string;
  street: string | null;
  buildingNumber: string | null;
  apartamentNumber: string | null;
  auctionLinks: CreateAuctionLinkDto[];
}

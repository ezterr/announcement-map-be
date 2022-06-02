export interface AnnouncementEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  createdBy: string;
  lat: number;
  lon: number;
  country: string;
  city: string | null;
  zipCode: string | null;
  street: string | null;
  buildingNumber: string | null;
  apartamentNumber: string | null;
}

export interface AnnouncementEntitySimple {
  id: string;
  lat: number;
  lon: number;
}

export interface AnnouncementEntityUser {
  id: string;
  createdBy: string
}

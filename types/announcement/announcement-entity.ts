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

export interface AnnouncementEntitySimple {
  id: string;
  lat: number;
  lon: number;
}

export interface AnnouncementEntityUser {
  id: string;
  createdBy: string
}

export type AnnouncementEntitySave = Omit<AnnouncementEntity, 'id' | 'createdBy' | 'createdAt'>

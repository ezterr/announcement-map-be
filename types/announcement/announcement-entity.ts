export interface AnnouncementEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  country: string;
  city: string | null;
  zipCode: string | null;
  street: string | null;
  buildingNumber: string | null;
}

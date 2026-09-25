export interface Car {
  id: string;
  name: string;
  category: string;
  transmission: string;
  seats: number;
  pricePerDay: number;
  image: string;
}

export interface CreateItemPayload {
  name: string;
  category: string;
  transmission: string;
  seats: number;
  pricePerDay: number;
  image: string;
}

export type UpdateItemPayload = Partial<CreateItemPayload>;

export interface ApiPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

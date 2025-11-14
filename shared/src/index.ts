export type UserRole = 'renter' | 'owner' | 'admin';

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  address?: Address;
  rating?: number;
}

export interface CostumeVariant {
  size: string;
  rentalPrice: number;
  replacementValue?: number;
  stock: number;
}

export interface Costume {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  variants: CostumeVariant[];
  rating?: number;
  isFeatured?: boolean;
  location?: string;
}

export interface Booking {
  id: string;
  costumeId: string;
  renterId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'processing' | 'succeeded' | 'refunded';
}

export interface Review {
  id: string;
  bookingId: string;
  costumeId: string;
  reviewerId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface ApiSuccess<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}

export const buildImageUrl = (key: string, bucket: string) => `https://${bucket}.s3.amazonaws.com/${key}`;

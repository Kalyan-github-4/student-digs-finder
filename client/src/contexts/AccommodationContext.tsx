import { error } from 'console';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { json } from 'stream/consumers';

export interface Accommodation {
  id: string;
  title: string;
  type: "mess" | "room" | "hostel";
  location: string;
  nearestCollege?: string;
  distance: number;
  price: number;
  priceType: "month" | "meal" | "night";
  rating: number;
  reviewCount?: number;
  image?: string;
  amenities: string[];
  availability?: "available" | "limited" | "full" | "";
  description?: string;
  contact?: {
    phone: string;
    email: string;
    owner: string;
  };
  rules?: string[];
  photos?: string[];
  status?: "pending" | "approved" | "rejected";
  capacity: number;
}



interface AccommodationContextType {
  accommodations: Accommodation[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredAccommodations: Accommodation[];
  getAccommodationById: (id: string) => Accommodation | undefined;
  addAccommodation: (newAccommodation: Omit<Accommodation, 'id'>) => void;
}

export const AccommodationContext = createContext<AccommodationContextType | undefined>(undefined);


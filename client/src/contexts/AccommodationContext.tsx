import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

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
  capacity: number;
  status?: "approved" | "pending" | "rejected"; // accommodation status
}



interface AccommodationContextType {
  accommodations: Accommodation[];
  setAccommodations: React.Dispatch<React.SetStateAction<Accommodation[]>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredAccommodations: Accommodation[];
  getAccommodationById: (id: string) => Accommodation | undefined;
  addAccommodation: (newAccommodation: Omit<Accommodation, 'id'>) => void;
}

export const AccommodationContext = createContext<AccommodationContextType | undefined>(undefined);

export const AccommodationProvider = ({ children }: { children: ReactNode }) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  //filter based on searchQuery
  const filteredAccommodations = useMemo(() => {
    if (!searchQuery.trim()) return accommodations;
    return accommodations.filter((acc) =>
      acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [accommodations, searchQuery]);
// 🔑 find accommodation by id
  const getAccommodationById = (id: string) =>
    accommodations.find((acc) => acc.id === id);

  // ➕ add new accommodation
  const addAccommodation = (newAccommodation: Omit<Accommodation, "id">) => {
    const id = Date.now().toString(); // simple unique id
    setAccommodations((prev) => [...prev, { ...newAccommodation, id }]);
  };

  return (
    <AccommodationContext.Provider value={{ accommodations,
        setAccommodations,
        searchQuery,
        setSearchQuery,
        filteredAccommodations,
        getAccommodationById,
        addAccommodation,}}>
      {children}
    </AccommodationContext.Provider>
  );
};


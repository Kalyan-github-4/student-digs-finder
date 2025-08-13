import React, { createContext, useContext, useState, ReactNode } from "react";

// 1️⃣ Define the shape of your accommodation data
interface Accommodation {
  id: string;
  title: string;
  type: "mess" | "room" | "hostel";
  location: string;
  distance: string;
  price: number;
  priceType: "month" | "meal" | "night";
  rating: number;
  reviewCount: number;
  image: string;
  amenities: string[];
  availability: "available" | "limited" | "full" | "";
  description: string;
  contact: {
    phone: string;
    email: string;
    owner: string;
  };
  photos: string[];
  capacity: number;
  rules: string[];
}

// 2️⃣ Define the context type
interface AccommodationContextType {
  accommodations: Accommodation[];
  setAccommodations: React.Dispatch<React.SetStateAction<Accommodation[]>>;
}

// 3️⃣ Create the context
const AccommodationContext = createContext<AccommodationContextType | undefined>(undefined);

// 4️⃣ Hook to use the context
export const useAccommodation = () => {
  const context = useContext(AccommodationContext);
  if (!context) {
    throw new Error("useAccommodation must be used within an AccommodationProvider");
  }
  return context;
};

// 5️⃣ Provider component
export const AccommodationProvider = ({ children }: { children: ReactNode }) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  return (
    <AccommodationContext.Provider value={{ accommodations, setAccommodations }}>
      {children}
    </AccommodationContext.Provider>
  );
};

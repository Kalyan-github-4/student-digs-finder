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

const mockAccommodations: Accommodation[] = [
  {
    id: "1",
    title: "Raj Mess & Tiffin Service",
    type: "mess",
    location: "Near Engineering College",
    distance: 0.5,
    price: 4500,
    priceType: "month",
    rating: 4.5,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1619810230359-b2c2f61c49cd?w=400&h=300&fit=crop",
    amenities: ["Meals", "Delivery", "Veg/Non-veg"],
    availability: "available",
    description: "Home-style cooking with variety of North and South Indian dishes. Fresh vegetables and quality ingredients used daily.",
    contact: {
      phone: "+91 98765 43210",
      email: "rajmess@example.com",
      owner: "Raj Kumar"
    },
    rules: ["No outside food", "Advance payment required", "Clean utensils policy"],
    photos: [
      "https://images.unsplash.com/photo-1619810230359-b2c2f61c49cd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1619810230359-b2c2f61c49cd?w=800&h=600&fit=crop"
    ],
    capacity: 50
  }

];

interface AccommodationContextType {
  accommodations: Accommodation[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredAccommodations: Accommodation[];
  getAccommodationById: (id: string) => Accommodation | undefined;
  addAccommodation: (newAccommodation: Omit<Accommodation, 'id'>) => void;
}

const AccommodationContext = createContext<AccommodationContextType | undefined>(undefined);

export const AccommodationProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [accommodations, setAccommodations] = useState<Accommodation[]>(mockAccommodations);

  //Load from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem("accommodations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAccommodations(parsed);
      } catch (error) {
        console.error("Failed to parse accommodations from localStorage", error);
      }
    }
  }, [])

  //Save to localStorage whenever accommodations change
  useEffect(() => {
    localStorage.setItem("acomodations", JSON.stringify(accommodations));
  }, [accommodations])

  const filteredAccommodations = mockAccommodations.filter(accommodation =>
    accommodation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accommodation.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accommodation.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accommodation.amenities.some(amenity =>
      amenity.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getAccommodationById = (id: string) => {
    return mockAccommodations.find(acc => acc.id === id);
  };

  const addAccommodation = (newAccommodation: Omit<Accommodation, 'id'>) => {
    const accommodationWithId: Accommodation = {
      ...newAccommodation,
      id: Date.now().toString(),
      status: newAccommodation.status || "pending",
      rating: newAccommodation.rating || 0,
      reviewCount: newAccommodation.reviewCount || 0,
      availability: newAccommodation.availability || "available"
    };

    setAccommodations(prev => [...prev, accommodationWithId]);
    return accommodationWithId; // Return the created accommodation
  };

  return (
    <AccommodationContext.Provider value={{
      accommodations,
      searchQuery,
      setSearchQuery,
      filteredAccommodations,
      getAccommodationById,
      addAccommodation
    }}>
      {children}
    </AccommodationContext.Provider>
  );
};

export const useAccommodation = () => {
  const context = useContext(AccommodationContext);
  if (context === undefined) {
    throw new Error('useAccommodation must be used within an AccommodationProvider');
  }
  return context;
};
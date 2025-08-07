import { createContext, useContext, useState, ReactNode } from 'react';

export interface Accommodation {
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
  availability: "available" | "limited" | "full";
  description?: string;
  contact?: {
    phone: string;
    email: string;
    owner: string;
  };
  rules?: string[];
  photos?: string[];
}

const mockAccommodations: Accommodation[] = [
  {
    id: "1",
    title: "Raj Mess & Tiffin Service",
    type: "mess",
    location: "Near Engineering College",
    distance: "0.5 km",
    price: 4500,
    priceType: "month",
    rating: 4.5,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
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
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "2",
    title: "Green View Boys Hostel",
    type: "hostel",
    location: "University Area",
    distance: "1.2 km",
    price: 12000,
    priceType: "month",
    rating: 4.2,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1555854877-bab0e460b3d5?w=400&h=300&fit=crop",
    amenities: ["Wi-Fi", "AC", "24/7", "Meals"],
    availability: "limited",
    description: "Modern hostel facility with all amenities for comfortable stay. Safe and secure environment for students.",
    contact: {
      phone: "+91 98765 43211",
      email: "greenview@example.com",
      owner: "Suresh Patel"
    },
    rules: ["No visitors after 10 PM", "Maintain cleanliness", "Respect quiet hours"],
    photos: [
      "https://images.unsplash.com/photo-1555854877-bab0e460b3d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "3",
    title: "Cozy Studio Apartment",
    type: "room",
    location: "Student Zone",
    distance: "0.8 km",
    price: 15000,
    priceType: "month",
    rating: 4.7,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    amenities: ["Wi-Fi", "AC", "Parking", "Kitchen"],
    availability: "available",
    description: "Fully furnished studio apartment perfect for students. Independent living with all modern amenities.",
    contact: {
      phone: "+91 98765 43212",
      email: "cozystudio@example.com",
      owner: "Priya Sharma"
    },
    rules: ["No smoking", "One occupant only", "Monthly cleaning required"],
    photos: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "4",
    title: "South Indian Mess",
    type: "mess",
    location: "College Road",
    distance: "0.3 km",
    price: 3800,
    priceType: "month",
    rating: 4.3,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    amenities: ["Meals", "South Indian", "Home-style"],
    availability: "available",
    description: "Authentic South Indian cuisine with traditional flavors. Special focus on healthy and nutritious meals.",
    contact: {
      phone: "+91 98765 43213",
      email: "southindianmess@example.com",
      owner: "Ravi Krishnan"
    },
    rules: ["Meal timings strictly followed", "No wastage policy", "Hygienic practices"],
    photos: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "5",
    title: "Shared Room - Male Students",
    type: "room",
    location: "Campus View",
    distance: "1.5 km",
    price: 8000,
    priceType: "month",
    rating: 4.0,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1499954110024-1171a6186445?w=400&h=300&fit=crop",
    amenities: ["Wi-Fi", "Shared", "Study Room"],
    availability: "limited",
    description: "Shared accommodation for male students with study facilities. Budget-friendly option near campus.",
    contact: {
      phone: "+91 98765 43214",
      email: "sharedroom@example.com",
      owner: "Amit Singh"
    },
    rules: ["Male students only", "Shared responsibility", "Study hours respected"],
    photos: [
      "https://images.unsplash.com/photo-1499954110024-1171a6186445?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "6",
    title: "Premium Girls Hostel",
    type: "hostel",
    location: "Safe Zone",
    distance: "2.1 km",
    price: 18000,
    priceType: "month",
    rating: 4.8,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    amenities: ["Wi-Fi", "AC", "24/7", "Meals", "Gym"],
    availability: "full",
    description: "Premium accommodation for female students with top-notch security and amenities. Comfortable and safe environment.",
    contact: {
      phone: "+91 98765 43215",
      email: "premiumgirls@example.com",
      owner: "Sunita Agarwal"
    },
    rules: ["Female students only", "Security protocols", "No male visitors"],
    photos: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop"
    ]
  }
];

interface AccommodationContextType {
  accommodations: Accommodation[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredAccommodations: Accommodation[];
  getAccommodationById: (id: string) => Accommodation | undefined;
}

const AccommodationContext = createContext<AccommodationContextType | undefined>(undefined);

export const AccommodationProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <AccommodationContext.Provider value={{
      accommodations: mockAccommodations,
      searchQuery,
      setSearchQuery,
      filteredAccommodations,
      getAccommodationById
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
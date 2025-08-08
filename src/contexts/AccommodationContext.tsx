import { error } from 'console';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { json } from 'stream/consumers';

export interface Accommodation {
  id: string;
  title: string;
  type: "mess" | "room" | "hostel";
  location: string;
  nearestCollege?: string;
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
  status?: "pending" | "approved" | "rejected";
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
    image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1270314768198309910/original/c389f712-5665-4b38-b83b-29f9b8fd73d0.jpeg",
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
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1270314768198309910/original/c389f712-5665-4b38-b83b-29f9b8fd73d0.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1270314768198309910/original/0cdd2574-c852-4591-af57-a815b502793f.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI3MDMxNDc2ODE5ODMwOTkxMA==/original/87a7faee-502a-4d34-b93c-0025f5e30365.png",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1270314768198309910/original/7d9ba1b2-6447-4f11-b781-a83a89695c53.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1270314768198309910/original/5462f27e-db02-408c-b544-0793e8de5992.jpeg"
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
    image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1454831327322052843/original/ab14e42e-5ca6-448c-b7da-2cfd07d3f4f3.jpeg",
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
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1454831327322052843/original/0f300a03-bdfa-4fc6-819e-09e30a8b3b59.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1454831327322052843/original/b73ed3fe-78c0-41f4-a425-b20ed5e47c93.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1454831327322052843/original/7b246f4d-a30a-4377-9c79-c4e713086d19.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1454831327322052843/original/5fef837c-cb8e-4135-8eb7-f48be6dd08ed.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1454831327322052843/original/0f300a03-bdfa-4fc6-819e-09e30a8b3b59.jpeg"
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
    image: "https://images.unsplash.com/photo-1621891337421-af0e6b355e2f?w=1170&fit=crop",
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
      "https://images.unsplash.com/photo-1621891337421-af0e6b355e2f?w=1170&fit=crop",
      "https://images.unsplash.com/photo-1621891337421-af0e6b355e2f?w=1170&fit=crop",
      "https://images.unsplash.com/photo-1621891337421-af0e6b355e2f?w=1170&fit=crop"
    ]
  },

  {
    id: "6",
    title: "Premium Girls Hostel",
    type: "hostel",
    location: "Safe Zone",
    nearestCollege: "ABC Engineering College",
    distance: "2.1 km",
    price: 18000,
    priceType: "month",
    rating: 4.8,
    reviewCount: 234,
    image: "https://shorturl.at/QqwSv",
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
      "https://a0.muscache.com/im/pictures/e4752c79-006a-4a80-912c-89aca0e90555.jpg",
      "https://a0.muscache.com/im/pictures/140204d7-e530-44e4-9427-d644b95fb0e4.jpg",
      "https://a0.muscache.com/im/pictures/0801dc66-770a-4d31-9c40-3a152c495871.jpg",
      "https://a0.muscache.com/im/pictures/ab2c95e2-a8e9-4ae5-bb5b-1d25713a3bab.jpg",
      "https://a0.muscache.com/im/pictures/4ca2c01a-aef4-4a7e-bf70-e996b13f4dc8.jpg",

    ]
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
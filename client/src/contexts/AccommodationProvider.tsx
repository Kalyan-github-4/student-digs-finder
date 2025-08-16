import { useState, useEffect, ReactNode } from "react";
import { Accommodation, AccommodationContext } from "./AccommodationContext";

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

export const AccommodationProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [accommodations, setAccommodations] = useState<Accommodation[]>(mockAccommodations);
useEffect(() => {
  const fetchAccommodations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/accommodations");
      const data = await res.json();
      setAccommodations(data);
    } catch (err) {
      console.error("Falling back to localStorage:", err);
      const saved = localStorage.getItem("accommodations");
      if (saved) {
        try {
          setAccommodations(JSON.parse(saved));
        } catch (parseError) {
          console.error("Failed to parse accommodations from localStorage:", parseError);
        }
      }
    }
  };
  fetchAccommodations();
}, []);

 // Filtering logic
  const filteredAccommodations = accommodations.filter(accommodation =>
    accommodation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accommodation.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accommodation.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (accommodation.amenities || []).some(amenity =>
      amenity.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getAccommodationById = (id: string) => {
    return accommodations.find(acc => acc.id === id);
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
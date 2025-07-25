import AccommodationCard from "./AccommodationCard";

// Mock data for demonstration
const mockAccommodations = [
  {
    id: "1",
    title: "Raj Mess & Tiffin Service",
    type: "mess" as const,
    location: "Near Engineering College",
    distance: "0.5 km",
    price: 4500,
    priceType: "month" as const,
    rating: 4.5,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    amenities: ["Meals", "Delivery", "Veg/Non-veg"],
    availability: "available" as const
  },
  {
    id: "2",
    title: "Green View Boys Hostel",
    type: "hostel" as const,
    location: "University Area",
    distance: "1.2 km",
    price: 12000,
    priceType: "month" as const,
    rating: 4.2,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1555854877-bab0e460b3d5?w=400&h=300&fit=crop",
    amenities: ["Wi-Fi", "AC", "24/7", "Meals"],
    availability: "limited" as const
  },
  {
    id: "3",
    title: "Cozy Studio Apartment",
    type: "room" as const,
    location: "Student Zone",
    distance: "0.8 km",
    price: 15000,
    priceType: "month" as const,
    rating: 4.7,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    amenities: ["Wi-Fi", "AC", "Parking", "Kitchen"],
    availability: "available" as const
  },
  {
    id: "4",
    title: "South Indian Mess",
    type: "mess" as const,
    location: "College Road",
    distance: "0.3 km",
    price: 3800,
    priceType: "month" as const,
    rating: 4.3,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    amenities: ["Meals", "South Indian", "Home-style"],
    availability: "available" as const
  },
  {
    id: "5",
    title: "Shared Room - Male Students",
    type: "room" as const,
    location: "Campus View",
    distance: "1.5 km",
    price: 8000,
    priceType: "month" as const,
    rating: 4.0,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1499954110024-1171a6186445?w=400&h=300&fit=crop",
    amenities: ["Wi-Fi", "Shared", "Study Room"],
    availability: "limited" as const
  },
  {
    id: "6",
    title: "Premium Girls Hostel",
    type: "hostel" as const,
    location: "Safe Zone",
    distance: "2.1 km",
    price: 18000,
    priceType: "month" as const,
    rating: 4.8,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    amenities: ["Wi-Fi", "AC", "24/7", "Meals", "Gym"],
    availability: "full" as const
  }
];

const AccommodationGrid = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {mockAccommodations.length} accommodations found
        </h2>
        <select className="px-3 py-2 border border-border rounded-md bg-background text-foreground">
          <option value="recommended">Recommended</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="distance">Closest Distance</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAccommodations.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            {...accommodation}
          />
        ))}
      </div>
    </div>
  );
};

export default AccommodationGrid;
import AccommodationCard from "./AccommodationCard";
import { useAccommodation } from "@/contexts/AccommodationContext";

const AccommodationGrid = () => {
  const { filteredAccommodations, searchQuery } = useAccommodation();
  
  return (
    <div id="results-section" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {filteredAccommodations.length} accommodations found
          {searchQuery && <span className="text-muted-foreground text-base font-normal ml-2">for "{searchQuery}"</span>}
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
        {filteredAccommodations.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            {...accommodation}
          />
        ))}
      </div>
      
      {filteredAccommodations.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-foreground mb-2">No accommodations found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default AccommodationGrid;
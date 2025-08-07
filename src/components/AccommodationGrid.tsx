import AccommodationCard from "./AccommodationCard";
import { useAccommodation } from "@/contexts/AccommodationContext";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";


const AccommodationGrid = () => {
  const { filteredAccommodations, searchQuery } = useAccommodation();

  return (
    <div id="results-section" className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
  <h2 className="text-xl font-semibold text-foreground md:w-1/2">
    {filteredAccommodations.length} accommodations found
    {searchQuery && (
      <span className="text-muted-foreground text-sm font-normal ml-2">
        for "{searchQuery}"
      </span>
    )}
  </h2>

  <div className="md:w-1/2 flex flex-col md:flex-row md:items-center gap-1 md:justify-end">
    <Select>
      <SelectTrigger className="h-8 text-sm w-[160px]">
        <SelectValue placeholder="Recommended" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all"  className="px-5">Price: Low to High</SelectItem>
        <SelectItem value="mess" className="px-5">Price: High to Low</SelectItem>
        <SelectItem value="room" className="px-5">Highest Rated</SelectItem>
        <SelectItem value="hostel" className="px-5">Closest Distance</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccommodations.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            {...accommodation}
          />
        ))}
      </div>
      <div className="flex justify-end gap-2" >
        <Button variant="outline" className="transition-transform duration-200 hover:scale-105">
          <ChevronLeftIcon />Prev
        </Button>
        <Button variant="outline" className="transition-transform duration-200 hover:scale-105">
          Next <ChevronRightIcon />
        </Button>

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
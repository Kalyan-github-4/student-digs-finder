import AccommodationCard from "./AccommodationCard";
import { useAccommodation } from "@/hooks/useAccommodation";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Pagination from "./Pagination";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const AccommodationGrid = () => {
  const { filteredAccommodations, searchQuery } = useAccommodation();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage;
  const currentAccomodations = filteredAccommodations.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filteredAccommodations.length / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
    }
    return (
      <div id="results-section" className="space-y-4">

        {/* Header */}
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
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="px-7">Men</SelectItem>
                <SelectItem value="mess" className="px-7">Women</SelectItem>
                <SelectItem value="room" className="px-7">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>


            {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAccomodations.map((accommodation) => (
            <AccommodationCard
              key={accommodation.id}
              {...accommodation}
                isPending={accommodation.status ? accommodation.status === 'pending' : false}
            />
          ))}
        </div>

        {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNextPage}
            onPrev={handlePrevPage}

          />

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
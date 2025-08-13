import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

const SearchFilters = () => {
  const [priceRange, setPriceRange] = useState([5000, 25000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenities = [
    "Wi-Fi", "AC", "Parking", "Meals", "Laundry", "24/7 Security", 
    "Study Room", "Common Area", "Single Room", "Shared Room"
  ];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setPriceRange([5000, 25000]);
    setSelectedAmenities([]);
  };

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Property Type */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Property Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="mess">Mess</SelectItem>
              <SelectItem value="room">Room</SelectItem>
              <SelectItem value="hostel">Hostel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Distance */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Distance from College</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Any distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1km">Within 1 km</SelectItem>
              <SelectItem value="2km">Within 2 km</SelectItem>
              <SelectItem value="5km">Within 5 km</SelectItem>
              <SelectItem value="10km">Within 10 km</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={1000}
            max={50000}
            step={1000}
            className="w-full"
          />
        </div>

        {/* Rating */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Minimum Rating</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="2">2+ Stars</SelectItem>
              <SelectItem value="1">1+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amenities */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Amenities</Label>
          <div className="grid grid-cols-2 gap-2">
            {amenities.map((amenity) => (
              <Badge
                key={amenity}
                variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                className="cursor-pointer justify-center py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => toggleAmenity(amenity)}
              >
                {amenity}
                {selectedAmenities.includes(amenity) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Availability</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Any availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available Now</SelectItem>
              <SelectItem value="limited">Limited Availability</SelectItem>
              <SelectItem value="upcoming">Available Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" variant="default">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
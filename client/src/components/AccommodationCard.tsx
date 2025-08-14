import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Star, Wifi, Car, UtensilsCrossed, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AccommodationCardProps {
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
  availability:"available" | "limited" | "full" | "";
  isPending?: boolean;
}

const AccommodationCard = ({
  id,
  title,
  type,
  location,
  distance,
  price,
  priceType,
  rating,
  reviewCount,
  image,
  amenities,
  availability,
  isPending = false
}: AccommodationCardProps) => {
  const navigate = useNavigate();
  const typeColors = {
    mess: "bg-success text-success-foreground",
    room: "bg-primary text-primary-foreground",
    hostel: "bg-secondary text-secondary-foreground"
  };

  const availabilityColors = {
    available: "bg-success text-success-foreground",
    limited: "bg-warning text-warning-foreground",
    full: "bg-destructive text-destructive-foreground"
  };

  const amenityIcons = {
    "Wi-Fi": Wifi,
    "Parking": Car,
    "Meals": UtensilsCrossed,
    "24/7": Clock,
    "Shared": Users
  };

  return (
    <Card className={`group overflow-hidden border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 ${isPending ? "opacity-70" : ""}`}>
       {/* Pending overlay */}
      {isPending && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
          <p className="text-sm bg-secondary px-2 py-1 rounded">
            Pending Approval
          </p>
        </div> 
      )}

      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className={typeColors[type]} variant="secondary">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className={availabilityColors[availability]} variant="secondary">
            {availability.charAt(0).toUpperCase() + availability.slice(1)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
          {title}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location} • {distance}</span>
        </div>

        <div className="flex items-center mb-3">
          <Star className="h-4 w-4 text-warning mr-1 fill-current" />
          <span className="font-medium text-foreground">{rating}</span>
          <span className="text-muted-foreground text-sm ml-1">
            ({reviewCount} reviews)
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity) => {
            const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
            return (
              <div key={amenity} className="flex items-center text-xs text-muted-foreground bg-muted rounded-full px-2 py-1">
                {IconComponent && <IconComponent className="h-3 w-3 mr-1" />}
                {amenity}
              </div>
            );
          })}
          {amenities.length > 3 && (
            <div className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-1">
              +{amenities.length - 3} more
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">₹{price}</span>
            <span className="text-muted-foreground text-sm">/{priceType}</span>
          </div>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => navigate(`/accommodation/${id}`)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccommodationCard;
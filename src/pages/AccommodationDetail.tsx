import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAccommodation } from "@/contexts/AccommodationContext";
import { ArrowLeft, MapPin, Star, Phone, Mail, User, CheckCircle, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AccommodationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAccommodationById } = useAccommodation();
  
  const accommodation = getAccommodationById(id!);

  if (!accommodation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Accommodation not found</h1>
          <Button onClick={() => navigate("/")}>Back to Search</Button>
        </div>
        <Footer />
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={accommodation.image}
                alt={accommodation.title}
                className="w-full h-64 lg:h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={typeColors[accommodation.type]} variant="secondary">
                  {accommodation.type.charAt(0).toUpperCase() + accommodation.type.slice(1)}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className={availabilityColors[accommodation.availability]} variant="secondary">
                  {accommodation.availability.charAt(0).toUpperCase() + accommodation.availability.slice(1)}
                </Badge>
              </div>
            </div>
            
            {accommodation.photos && accommodation.photos.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {accommodation.photos.slice(1).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${accommodation.title} - ${index + 2}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {accommodation.title}
              </h1>
              
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{accommodation.location} • {accommodation.distance}</span>
              </div>

              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-warning mr-1 fill-current" />
                <span className="font-medium text-foreground text-lg">{accommodation.rating}</span>
                <span className="text-muted-foreground ml-2">
                  ({accommodation.reviewCount} reviews)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">₹{accommodation.price}</span>
                <span className="text-muted-foreground text-lg">/{accommodation.priceType}</span>
              </div>
            </div>

            {/* Amenities */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {accommodation.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-foreground">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {accommodation.description && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">Description</h3>
                  <p className="text-muted-foreground">{accommodation.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            {accommodation.contact && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-foreground">{accommodation.contact.owner}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-foreground">{accommodation.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-foreground">{accommodation.contact.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Rules */}
            {accommodation.rules && accommodation.rules.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">Rules & Policies</h3>
                  <div className="space-y-2">
                    {accommodation.rules.map((rule, index) => (
                      <div key={index} className="flex items-start">
                        <Info className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{rule}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 bg-white">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button className="h-12">
                <CheckCircle className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AccommodationDetail;
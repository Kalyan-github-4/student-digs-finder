import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import {
  Home,
  Upload,
  MapPin,
  IndianRupee,
  Users,
  Wifi,
  Car,
  UtensilsCrossed,
  Clock,
  Shield,
  Star,
  CheckCircle
} from "lucide-react";

const ListYourProperty = () => {
  const [propertyType, setPropertyType] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenitiesList = [
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "parking", label: "Parking", icon: Car },
    { id: "meals", label: "Meals", icon: UtensilsCrossed },
    { id: "24x7", label: "24/7 Access", icon: Clock },
    { id: "ac", label: "Air Conditioning", icon: Home },
    { id: "security", label: "Security", icon: Shield },
  ];

  const handleAmenityChange = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  // Inside the ListYourProperty component
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoButtonClick = () => {
    fileInputRef.current?.click(); // Triggers file picker
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Handle the file uploads (show preview, upload logic, etc.)
      console.log("Selected files:", files);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-secondary/10 to-primary/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            List Your Property
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our platform and start earning by listing your mess, hostel, or rental room.
            Reach thousands of students looking for accommodation.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 text-warning mr-2" />
                  Why List With Us?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground">Reach More Students</h3>
                    <p className="text-sm text-muted-foreground">Connect with students from 50+ partner colleges</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground">Easy Management</h3>
                    <p className="text-sm text-muted-foreground">Manage bookings and inquiries from one dashboard</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground">Verified Listings</h3>
                    <p className="text-sm text-muted-foreground">Build trust with our verification process</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground">No Hidden Fees</h3>
                    <p className="text-sm text-muted-foreground">Transparent pricing with no surprise charges</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Property Registration Form</CardTitle>
                <p className="text-muted-foreground">Fill in the details below to list your property</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>

                  <div>
                    <Label htmlFor="property-name">Property Name *</Label>
                    <Input
                      id="property-name"
                      placeholder="e.g., Green View Boys Hostel, Raj Mess"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="property-type">Property Type *</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mess">Mess</SelectItem>
                        <SelectItem value="hostel">Hostel</SelectItem>
                        <SelectItem value="room">Private Room</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your property, facilities, and what makes it special..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Location Details</h3>

                  <div>
                    <Label htmlFor="address">Full Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter complete address with landmarks"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nearest-college">Nearest College *</Label>
                      <Input
                        id="nearest-college"
                        placeholder="e.g., ABC Engineering College"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="distance">Distance from College *</Label>
                      <Input
                        id="distance"
                        placeholder="e.g., 0.5 km"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Pricing Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price *</Label>
                      <div className="relative mt-1">
                        <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="price"
                          placeholder="Enter amount"
                          className="pl-10"
                          type="number"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="price-type">Price Type *</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select pricing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="month">Per Month</SelectItem>
                          <SelectItem value="meal">Per Meal</SelectItem>
                          <SelectItem value="night">Per Night</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="capacity">Capacity *</Label>
                    <div className="relative mt-1">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="capacity"
                        placeholder="Maximum occupancy"
                        className="pl-10"
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenitiesList.map((amenity) => {
                      const IconComponent = amenity.icon;
                      return (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity.id}
                            checked={selectedAmenities.includes(amenity.id)}
                            onCheckedChange={() => handleAmenityChange(amenity.id)}
                          />
                          <Label htmlFor={amenity.id} className="flex items-center cursor-pointer">
                            <IconComponent className="h-4 w-4 mr-2" />
                            {amenity.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Photos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Photos</h3>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-foreground mb-2">Upload Property Photos</h4>
                    <p className="text-muted-foreground mb-4">
                      Add high-quality photos to attract more students. Maximum 10 photos allowed.
                    </p>
                    <Button variant="outline" onClick={handlePhotoButtonClick}>
                      Choose Files
                    </Button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="owner-name">Owner Name *</Label>
                      <Input
                        id="owner-name"
                        placeholder="Your full name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+91 XXXX XXX XXX"
                        className="mt-1"
                        type="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      placeholder="your.email@example.com"
                      className="mt-1"
                      type="email"
                    />
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>
                    </Label>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" className="flex-1">
                      Save as Draft
                    </Button>
                    <Button className="flex-1">
                      Submit for Review
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    Your property will be reviewed within 24-48 hours before going live.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListYourProperty;
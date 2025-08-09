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
import { Accommodation, useAccommodation } from "@/contexts/AccommodationContext";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Loader2 } from "lucide-react";
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
import { rejects } from "assert";

const ListYourProperty = () => {
  const [propertyType, setPropertyType] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);

  const { addAccommodation } = useAccommodation();
  const { toast } = useToast();

  // Existing state
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    type: "",
    location: "",
    nearestCollege: "",
    distance: "",
    price: "",
    priceType: "",
    description: "",
    availability: "",
    amenities: [] as string[],
    contact: {
      owner: "",
      phone: "",
      email: ""
    },
    photos: [] as File[],
    capacity: "",
    agreeToTerms: false
  });

  const amenitiesList = [
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "parking", label: "Parking", icon: Car },
    { id: "meals", label: "Meals", icon: UtensilsCrossed },
    { id: "24x7", label: "24/7 Access", icon: Clock },
    { id: "ac", label: "Air Conditioning", icon: Home },
    { id: "security", label: "Security", icon: Shield },
  ];

  const handleAmenityChange = (amenityId: string, isChecked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: isChecked
        ? [...prev.amenities, amenityId] // add if checked
        : prev.amenities.filter(id => id !== amenityId) // remove if unchecked
    }));
  };

  // Inside the ListYourProperty component
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoButtonClick = () => {
    fileInputRef.current?.click(); // Triggers file picker
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files).slice(0, 10);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...selectedFiles]
      }));
    }
  };

  //Implement the Draft Saving Functionality
  const handleSaveDraft = async () => {
    setDraftLoading(true);

    try {
      if (!formData.title || !formData.type) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please fill in all required fields before saving as draft."
        })
        return;
      }

      //Save to Local Storage
      const drafts = JSON.parse(localStorage.getItem("propertyDrafts") || "[]")
      const newDraft = {
        ...formData,
        id: `draft-${Date.now()}`, // Unique ID for draft
        savedAt: new Date().toISOString()
      };
      localStorage.setItem("propertyDrafts", JSON.stringify([...drafts, newDraft]))

      toast({
        title: "Draft Saved",
        description: "Your property details have been saved as a draft.",
      });
    }

    catch (error) {
      toast({
        variant: "destructive",
        title: "Error Saving Draft",
        description: "Could not save draft. Please try again.",
      });
      console.error("Draft save error:", error);
    } finally {
      setDraftLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.type || !formData.location || !formData.price) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields."
      });

      return;
    }

    // Check terms agreement
    if (!formData.agreeToTerms) {
      toast({
        variant: "destructive",
        title: "Terms Not Accepted",
        description: "Please agree to the Terms of Service and Privacy Policy."
      });
      return;
    }

    setIsSubmitting(true);

    // Convert photos to base64
    try {
      const photoPromises = (formData.photos || []).map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      });

      // Wait for all photos to be converted
      const photoUrls = await Promise.all(photoPromises);

      // Create new accommodation object
      const newAccommodation: Omit<Accommodation, "id"> = {
        title: formData.title,
        type: formData.type as "mess" | "room" | "hostel",
        location: formData.location,
        distance: formData.distance,
        price: Number(formData.price),
        priceType: formData.priceType as "month" | "meal" | "night",
        rating: 0, // New listings start with 0 ratings
        reviewCount: 0,
        image: photoUrls[0] || "", // Use first photo as main image
        amenities: formData.amenities,
        availability: formData.availability as "available" | "limited" | "full" | "",
        description: formData.description,
        contact: {
          phone: formData.contact.phone,
          email: formData.contact.email,
          owner: formData.contact.owner
        },
        photos: photoUrls,
        capacity: formData.capacity ? Number(formData.capacity) : 0,
        rules: [] // Can be added later
      };


      // Add to context
      const createdAccommodation = await addAccommodation(newAccommodation);

      // If this was a draft being submitted, remove it
      if (formData.id?.startsWith('draft-')) {
        const drafts: Accommodation[] = JSON.parse(localStorage.getItem('propertyDrafts') || '[]');
        const updatedDrafts = drafts.filter(d => d.id !== formData.id);
        localStorage.setItem('propertyDrafts', JSON.stringify(updatedDrafts));
      }
      // Show success message
      toast({
        title: "Property Listed!",
        description: "Your property has been submitted for review."
      });

      // Reset form
      setFormData({
        id: "",
        title: "",
        type: "",
        location: "",
        nearestCollege: "",
        distance: "",
        price: "",
        priceType: "",
        description: "",
        amenities: [],
        availability: "",
        contact: {
          owner: "",
          phone: "",
          email: ""
        },
        photos: [],
        capacity: "",
        agreeToTerms: false
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to list property. Please try again."
      });
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // // Update your form inputs to use formData state
  // // Example for property name input:
  // <Input
  //   id="property-name"
  //   value={formData.title}
  //   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
  //   placeholder="e.g., Green View Boys Hostel, Raj Mess"
  //   className="mt-1"
  // />

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
                <form onSubmit={handleSubmit}>


                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>

                    <div>
                      <Label htmlFor="property-name">Property Name *</Label>
                      <Input
                        id="property-name"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Green View Boys Hostel, Raj Mess"
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="property-type">Property Type *</Label>
                      <Select value={formData.type} onValueChange={(value => setFormData({ ...formData, type: value }))} required>
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
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your property, facilities, and what makes it special..."
                        className="mt-1 min-h-[100px]"
                        required
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
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Enter complete address with landmarks"
                        className="mt-1"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nearest-college">Nearest College *</Label>
                        <Input
                          id="nearest-college"
                          value={formData.nearestCollege}
                          onChange={(e) => setFormData({ ...formData, nearestCollege: e.target.value })}
                          placeholder="e.g., ABC Engineering College"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="distance">Distance from College *</Label>
                        <Input
                          id="distance"
                          value={formData.distance}
                          onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                          placeholder="e.g., 0.5 km"
                          type="number"
                          className="mt-1"
                          required
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
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="Enter amount"
                            className="pl-10"
                            type="number"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="price-type">Price Type *</Label>
                        <Select
                          value={formData.priceType}
                          onValueChange={(value) => setFormData({ ...formData, priceType: value })}
                        >
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
                          value={formData.capacity}
                          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                          required
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
                              checked={formData.amenities.includes(amenity.id)}
                              onCheckedChange={(isChecked) => handleAmenityChange(amenity.id, isChecked as boolean)}
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
                      <Button variant="outline" type="button" onClick={handlePhotoButtonClick}>
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
                    {formData.photos.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {formData.photos.map((photo, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Preview ${index}`}
                              className="h-24 w-full object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData({
                                ...formData,
                                photos: formData.photos.filter((_, i) => i !== index)
                              })}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
                          value={formData.contact.owner}
                          onChange={(e) => setFormData({
                            ...formData,
                            contact: { ...formData.contact, owner: e.target.value }
                          })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          placeholder="+91 XXXX XXX XXX"
                          className="mt-1"
                          type="tel"
                          value={formData.contact.phone}
                          onChange={(e) => setFormData({
                            ...formData,
                            contact: { ...formData.contact, phone: e.target.value }
                          })}
                          required
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
                        value={formData.contact.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          contact: { ...formData.contact, email: e.target.value }
                        })}
                        required
                      />
                    </div>
                  </div>

                  {/* Terms and Submit */}
                  <div className="space-y-4 pt-6 border-t border-border">
                    <div className="flex items-center space-x-2">

                      {/* Terms Checkbox */}
                      <Checkbox id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: Boolean(checked) })}
                        required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>
                      </Label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      {/* Save as Draft Button */}
                      <Button variant="outline" className="flex-1" type="button" onClick={handleSaveDraft}
                        disabled={draftLoading || isSubmitting}
                      > {draftLoading ? (
                        <Loader2 className="mr-2 h4 w-4 animate-spin" />
                      ) : null}
                        Save as Draft
                      </Button>

                      {/* Submit for Review Button */}
                      <Button className="flex-1" type="submit"
                        disabled={isSubmitting || !formData.agreeToTerms}
                      > {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                        Submit for Review
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground text-center">
                      Your property will be reviewed within 24-48 hours before going live.
                    </p>
                  </div>
                </form>
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
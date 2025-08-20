import { useState, useRef } from "react";
import { Accommodation } from "@/contexts/AccommodationContext";
import { useAccommodation } from "@/hooks/useAccommodation";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { Home, Upload, MapPin, IndianRupee, Users, Wifi, Car, UtensilsCrossed, Clock, Shield, Star, CheckCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;
export interface propertyFormData {
  id: string;
  title: string;
  type: "mess" | "room" | "hostel";
  location: string;
  nearestCollege?: string;
  distance: number;
  price: number;
  priceType: "month" | "meal" | "night";
  rating: number;
  reviewCount: number;
  image: string;
  amenities: string[];
  availability: "available" | "limited" | "full" | "";
  description: string;
  contact: {
    phone: string;
    email: string;
    owner: string;
  };
  rules: string[];
  photos: string[];
  capacity: number;
  isPending?: boolean;
  agreeToTerms?: boolean;
  status?: "approved" | "pending" | "rejected";
}


export const usePropertyListing = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
    agreeToTerms: false,
    status: "approved" // Default status 
  
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
      const photoPromises = await Promise.all((formData.photos || []).map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      }));

      // Wait for all photos to be converted
      const photoUrls = await Promise.all(photoPromises);
      // Create new accommodation object
      const payload = {
        title: formData.title,
        type: formData.type as "mess" | "room" | "hostel",
        location: formData.location,
        distance: formData.distance,
        nearestCollege: formData.nearestCollege, 
        price: Number(formData.price),
        priceType: formData.priceType as "month" | "meal" | "night",
        rating: 0,
        reviewCount: 0,
        image: photoUrls[0] || "",
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
        rules: [],
        status: "approved"

      };
      console.log("Payload being sent to backend:", payload);

      //Send to Back-end

      const response = await fetch(`${API_URL}/api/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
      console.log("Sending to API:", formData);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to save property");
      }

      //Get the saved data from backend
      const savedProperty = await response.json();

      // const responseData = await response.json();
      addAccommodation(
        {
          ...savedProperty,
          status: "approved",
          image: savedProperty.photos[0] || "", // Set main image
          rating: 0, // Default values
          reviewCount: 0
        }
      );

      toast({
        title: "Property Listed!",
        description: "Your property has been successfully saved.",
      });

      // If this was a draft being submitted, remove it
      if (formData.id?.startsWith('draft-')) {
        const drafts: Accommodation[] = JSON.parse(localStorage.getItem('propertyDrafts') || '[]');
        const updatedDrafts = drafts.filter(d => d.id !== formData.id);
        localStorage.setItem('propertyDrafts', JSON.stringify(updatedDrafts));
      }

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
        agreeToTerms: false,
        status: "approved"
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit property"
      });
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    setFormData,
    amenitiesList,
    handleAmenityChange,
    handlePhotoButtonClick,
    handlePhotoUpload,
    handleSaveDraft,
    handleSubmit,
    isSubmitting,
    draftLoading,
    fileInputRef
  }

}

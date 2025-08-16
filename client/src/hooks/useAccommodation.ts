import { useContext } from "react";
import { AccommodationContext } from "@/contexts/AccommodationContext";

export const useAccommodation = () => {
  const context = useContext(AccommodationContext);
  if (context === undefined) {
    throw new Error("useAccommodation must be used within an AccommodationProvider");
  }
  return context;
};

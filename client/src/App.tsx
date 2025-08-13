import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccommodationProvider } from "@/contexts/AccommodationContext";
import Index from "./pages/Index";
import BrowseAccommodation from "./pages/BrowseAccommodation";
import ListYourProperty from "./pages/ListYourProperty";
import AccommodationDetail from "./pages/AccommodationDetail";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";


const queryClient = new QueryClient();

const App = () => {

// ✅ useEffect correctly placed inside function body
  useEffect(() => {
    document.querySelectorAll('link[rel*="icon"]').forEach(link => link.remove());

    const blankFavicon = document.createElement('link');
    blankFavicon.rel = 'icon';
    blankFavicon.href = 'data:,';
    document.head.appendChild(blankFavicon);
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AccommodationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/browse" element={<BrowseAccommodation />} />
            <Route path="/list-property" element={<ListYourProperty />} />
            <Route path="/accommodation/:id" element={<AccommodationDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AccommodationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);};

export default App;

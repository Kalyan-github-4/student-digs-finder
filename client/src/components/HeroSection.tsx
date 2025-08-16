import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useAccommodation } from "@/hooks/useAccommodation";
import heroImage from "@/assets/hero-campus.jpg";

const HeroSection = () => {
  const { searchQuery, setSearchQuery } = useAccommodation();

  const handleSearch = () => {
    // Scroll to results section
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt="Campus accommodation"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Find Your Perfect
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Student Accommodation
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover nearby messes, hostels, and rental rooms with ease. 
            Book instantly, read reviews, and find your home away from home.
          </p>

          {/* Search Bar */}
          <div className="bg-card rounded-2xl shadow-xl p-6 mb-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter your college or location..."
                    className="pl-10 h-12 border-0 bg-muted/50 focus:bg-background transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Move-in date"
                    className="pl-10 h-12 border-0 bg-muted/50 focus:bg-background transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <Button variant="hero" className="w-full h-12" onClick={handleSearch}>
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Verified Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Partner Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">10k+</div>
              <div className="text-sm text-muted-foreground">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
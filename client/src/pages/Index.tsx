import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchFilters from "@/components/SearchFilters";
import AccommodationGrid from "@/components/AccommodationGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters />
          </div>
          
          {/* Accommodation Grid */}
          <div className="lg:col-span-3">
            <AccommodationGrid />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;

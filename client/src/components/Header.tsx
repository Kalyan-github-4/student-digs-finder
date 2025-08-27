import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, MapPin, User, Bell, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* Icon with gradient background */}
            <Home className="w-10 h-10 text-emerald-500 bg-emerald-500/10 rounded-full p-1.5" />

            {/* Brand Name with gradient text */}
            <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide">
              EasyPG
            </span>
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/browse"
              className={`transition-colors ${isActive('/browse')
                ? 'text-primary font-medium'
                : 'text-foreground hover:text-primary'
                }`}
            >
              Browse Accommodations
            </Link>
            <Link
              to="/list-property"
              className={`transition-colors ${isActive('/list-property')
                ? 'text-primary font-medium'
                : 'text-foreground hover:text-primary'
                }`}
            >
              List Your Property
            </Link>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              Log In
            </Button>
            <Button variant="default" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                to="/browse"
                className={`transition-colors ${isActive('/browse')
                  ? 'text-primary font-medium'
                  : 'text-foreground hover:text-primary'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Accommodations
              </Link>
              <Link
                to="/list-property"
                className={`transition-colors ${isActive('/list-property')
                  ? 'text-primary font-medium'
                  : 'text-foreground hover:text-primary'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                List Your Property
              </Link>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Log In
                </Button>
                <Button variant="default" size="sm" className="flex-1">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
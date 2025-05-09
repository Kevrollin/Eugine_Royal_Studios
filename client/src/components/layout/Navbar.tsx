import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import ThemeToggle from "../ui/ThemeToggle";
import { Button } from "../ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav 
      id="mainNav" 
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300",
        scrolled ? "bg-primary/90 backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="glass px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-playfair font-bold text-white">
            <span className="text-secondary">E</span>ugine <span className="text-secondary">R</span>ay
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "text-white hover:text-secondary transition-colors",
                location === link.href && "text-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="bg-secondary hover:bg-secondary/90 text-primary font-montserrat font-medium rounded-full">
            <Link href="/booking">Book Now</Link>
          </Button>
          
          <ThemeToggle />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button 
            onClick={toggleMobileMenu} 
            className="text-white"
            aria-label="Toggle mobile menu"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass absolute w-full left-0 top-full py-4 px-6 z-50">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "text-white hover:text-secondary transition-colors py-2",
                  location === link.href && "text-secondary"
                )}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/booking" 
              className="bg-secondary hover:bg-secondary/90 text-primary font-montserrat font-medium px-5 py-2 rounded-full transition-colors text-center mt-2"
              onClick={closeMobileMenu}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

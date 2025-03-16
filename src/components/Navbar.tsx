
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import StyleThemeToggle from "./StyleThemeToggle";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-all duration-300 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-tight text-primary">
          Top<span className="text-gradient">Designr</span>
        </a>
        
        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#home" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Home
          </a>
          <a href="#work" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Work
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary/80 transition-colors">
            About
          </a>
          <a href="#services" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Services
          </a>
          <a href="#testimonials" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Testimonials
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Contact
          </a>
          <ThemeToggle />
          <StyleThemeToggle />
          <Button className="button-animation">Get Started</Button>
        </nav>
        
        <div className="flex items-center md:hidden space-x-4">
          <ThemeToggle />
          <StyleThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/50 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-4 p-6">
          <a 
            href="#home" 
            className="text-lg font-medium py-2 hover:text-primary/80 transition-colors"
            onClick={handleNavClick}
          >
            Home
          </a>
          <a 
            href="#work" 
            className="text-lg font-medium py-2 hover:text-primary/80 transition-colors"
            onClick={handleNavClick}
          >
            Work
          </a>
          <a 
            href="#about" 
            className="text-lg font-medium py-2 hover:text-primary/80 transition-colors"
            onClick={handleNavClick}
          >
            About
          </a>
          <a 
            href="#services" 
            className="text-lg font-medium py-2 hover:text-primary/80 transition-colors"
            onClick={handleNavClick}
          >
            Services
          </a>
          <a 
            href="#testimonials" 
            className="text-lg font-medium py-2 hover:text-primary/80 transition-colors"
            onClick={handleNavClick}
          >
            Testimonials
          </a>
          <a 
            href="#contact" 
            className="text-lg font-medium py-2 hover:text-primary/80 transition-colors"
            onClick={handleNavClick}
          >
            Contact
          </a>
          <Button className="w-full button-animation">Get Started</Button>
        </div>
      </div>
    </header>
  );
}

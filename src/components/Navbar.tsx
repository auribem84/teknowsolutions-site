
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-tekmo-blue/80 backdrop-blur-md py-3 shadow-md' : 'py-6'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tekmo-teal to-tekmo-purple">
            Tekmowsolutions
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-foreground hover:text-tekmo-teal transition">Home</a>
          <a href="#about" className="text-foreground hover:text-tekmo-teal transition">About Us</a>
          <a href="#solutions" className="text-foreground hover:text-tekmo-teal transition">Solutions</a>
          <a href="#playbooks" className="text-foreground hover:text-tekmo-teal transition">Playbooks</a>
          <a href="#resources" className="text-foreground hover:text-tekmo-teal transition">Resources</a>
          <a href="#contact" className="text-foreground hover:text-tekmo-teal transition">Contact</a>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button variant="default" className="bg-gradient-to-r from-tekmo-teal to-tekmo-purple hover:from-tekmo-purple hover:to-tekmo-teal transition-all">
            Get Started
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-tekmo-blue w-full py-4 px-6 shadow-lg absolute top-full left-0 right-0 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-foreground hover:text-tekmo-teal transition py-2" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" className="text-foreground hover:text-tekmo-teal transition py-2" onClick={() => setIsMenuOpen(false)}>About Us</a>
            <a href="#solutions" className="text-foreground hover:text-tekmo-teal transition py-2" onClick={() => setIsMenuOpen(false)}>Solutions</a>
            <a href="#playbooks" className="text-foreground hover:text-tekmo-teal transition py-2" onClick={() => setIsMenuOpen(false)}>Playbooks</a>
            <a href="#resources" className="text-foreground hover:text-tekmo-teal transition py-2" onClick={() => setIsMenuOpen(false)}>Resources</a>
            <a href="#contact" className="text-foreground hover:text-tekmo-teal transition py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <Button variant="default" className="w-full bg-gradient-to-r from-tekmo-teal to-tekmo-purple hover:from-tekmo-purple hover:to-tekmo-teal transition-all">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

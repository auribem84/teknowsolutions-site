
import { useState, useEffect } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react"; // Added ArrowRight, Menu and X will be replaced

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
  
  const navLinkProps = {
    spy: true,
    smooth: true,
    offset: -70, 
    duration: 500,
    className: "text-foreground hover:text-tekmo-teal transition cursor-pointer", 
    activeClass: "text-tekmo-teal font-semibold"
  };

  const mobileNavLinkProps = {
    ...navLinkProps,
    className: "text-foreground hover:text-tekmo-teal transition py-2 cursor-pointer", 
    onClick: () => setIsMenuOpen(false)
  };
  
  const scrollToTop = () => {
    scroll.scrollToTop({ duration: 500, smooth: true });
    if(isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-tekmo-blue/80 backdrop-blur-md py-3 shadow-md' : 'py-6'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={scrollToTop} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tekmo-teal to-tekmo-purple">
            Teknowsolutions
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={scrollToTop} className={navLinkProps.className}>Home</button>
          <ScrollLink to="about" {...navLinkProps}>About Us</ScrollLink>
          <ScrollLink to="services" {...navLinkProps}>Services</ScrollLink>
          <ScrollLink to="contact" {...navLinkProps}>Contact</ScrollLink>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button variant="default" className="bg-gradient-to-r from-tekmo-teal to-tekmo-purple hover:from-tekmo-purple hover:to-tekmo-teal transition-all" asChild>
            <ScrollLink to="contact" spy={true} smooth={true} offset={-70} duration={500} className="cursor-pointer">
              <span>Get Started</span>
            </ScrollLink>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          {/* Replacing Menu and X with ArrowRight for testing */}
          {isMenuOpen ? <ArrowRight size={24} /> : <ArrowRight size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-tekmo-blue w-full py-4 px-6 shadow-lg absolute top-full left-0 right-0 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <button onClick={scrollToTop} className={mobileNavLinkProps.className}>Home</button>
            <ScrollLink to="about" {...mobileNavLinkProps}>About Us</ScrollLink>
            <ScrollLink to="services" {...mobileNavLinkProps}>Services</ScrollLink>
            <ScrollLink to="contact" {...mobileNavLinkProps}>Contact</ScrollLink>
            <Button variant="default" className="w-full bg-gradient-to-r from-tekmo-teal to-tekmo-purple hover:from-tekmo-purple hover:to-tekmo-teal transition-all" asChild>
              <ScrollLink to="contact" spy={true} smooth={true} offset={-70} duration={500} className="cursor-pointer w-full text-center" onClick={() => setIsMenuOpen(false)}>
                <span>Get Started</span>
              </ScrollLink>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

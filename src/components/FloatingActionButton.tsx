
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link as ScrollLink } from "react-scroll"; // Changed from react-router-dom

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 mb-4 animate-fade-in">
          <div className="text-center mb-4">
            <h3 className="font-bold text-lg">Contact Us</h3>
            <p className="text-sm text-muted-foreground">How can we help you?</p>
          </div>
          <div className="space-y-2">
            <Button variant="default" className="w-full bg-gradient-to-r from-tekmo-teal to-tekmo-purple" asChild>
              <ScrollLink 
                to="contact" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500} 
                onClick={() => setIsOpen(false)}
                className="cursor-pointer flex items-center justify-center w-full h-full" // Added className for proper rendering within Button
              >
                Schedule a Call
              </ScrollLink>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <ScrollLink 
                to="contact" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500} 
                onClick={() => setIsOpen(false)}
                className="cursor-pointer flex items-center justify-center w-full h-full" // Added className for proper rendering within Button
              >
                Chat with Us
              </ScrollLink>
            </Button>
          </div>
        </div>
      )}
      
      <Button
        onClick={toggleOpen}
        className={`h-14 w-14 rounded-full bg-gradient-to-r from-tekmo-teal to-tekmo-purple hover:from-tekmo-purple hover:to-tekmo-teal shadow-lg transition-all`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
    </div>
  );
};

export default FloatingActionButton;

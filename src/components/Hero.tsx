
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg animate-fade-in">
            Transform Your IT with <span className="bg-clip-text text-transparent bg-gradient-to-r from-tekmo-teal to-tekmo-purple">Tekmowsolutions</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-up">
            Expert consulting for SMBs in infrastructure, cloud, security & beyond. 
            Build, optimize, and secure your technology for tomorrow's challenges.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              variant="default" 
              size="lg" 
              className="bg-gradient-to-r from-tekmo-teal to-tekmo-purple hover:from-tekmo-purple hover:to-tekmo-teal transition-all"
              asChild
            >
              <Link to="/contact">
                Start Your Free Audit <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-white border-white/60 hover:bg-white/10"
              asChild
            >
              <Link to="/contact">
                <Play size={16} className="mr-2" /> Schedule a Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Animated Triangle Decoration */}
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-tekmo-teal/20 rounded-3xl rotate-12 animate-float"></div>
      <div className="absolute -top-20 -right-12 w-60 h-60 bg-tekmo-purple/20 rounded-3xl -rotate-12 animate-float" style={{ animationDelay: "2s" }}></div>
    </section>
  );
};

export default Hero;

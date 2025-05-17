
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link as ScrollLink } from "react-scroll"; // Changed to ScrollLink for consistency if needed, but CTA buttons usually go to contact page/section

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden scroll-mt-20"> {/* Added id and scroll-mt */}
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg animate-fade-in">
            Transform Your IT with <span className="bg-clip-text text-transparent bg-gradient-to-r from-teknow-teal to-teknow-purple">Teknowsolutions</span> {/* Company Name & tekmo to teknow */}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-up">
            Expert consulting for SMBs in infrastructure, cloud, security & beyond. 
            Build, optimize, and secure your technology for tomorrow's challenges.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              variant="default" 
              size="lg" 
              className="bg-gradient-to-r from-teknow-teal to-teknow-purple hover:from-teknow-purple hover:to-teknow-teal transition-all" /* tekmo to teknow */
              asChild
            >
              <ScrollLink to="contact" spy={true} smooth={true} offset={-70} duration={500} className="cursor-pointer">
                Start Your Free Audit <ArrowRight size={16} className="ml-2" />
              </ScrollLink>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-white border-white/60 hover:bg-white/10"
              asChild
            >
              <ScrollLink to="contact" spy={true} smooth={true} offset={-70} duration={500} className="cursor-pointer">
                <Play size={16} className="mr-2" /> Schedule a Free Consultation
              </ScrollLink>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Animated Triangle Decoration */}
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teknow-teal/20 rounded-3xl rotate-12 animate-float"></div> {/* tekmo to teknow */}
      <div className="absolute -top-20 -right-12 w-60 h-60 bg-teknow-purple/20 rounded-3xl -rotate-12 animate-float" style={{ animationDelay: "2s" }}></div> {/* tekmo to teknow */}
    </section>
  );
};

export default Hero;



import { useState, useEffect, useRef } from "react";
import { Cloud, Shield, Cog, Code, Server } from "lucide-react";
import { Link as ScrollLink } from 'react-scroll';

type ServiceCard = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
};

const services: ServiceCard[] = [
  {
    icon: Server,
    title: "Infrastructure",
    description: "Optimize your IT infrastructure for reliability, scalability, and cost efficiency.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Accelerate innovation with seamless cloud migration and DevOps implementation.",
    color: "from-teknow-teal to-sky-600", // tekmo to teknow
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Protect your business with advanced cybersecurity and compliance solutions.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Cog,
    title: "Process Automation",
    description: "Streamline operations with intelligent automation and workflow optimization.",
    color: "from-teknow-orange to-amber-600", // tekmo to teknow
  },
  {
    icon: Code,
    title: "App Development",
    description: "Create custom applications tailored to your unique business requirements.",
    color: "from-teknow-purple to-indigo-600", // tekmo to teknow
  },
];

const ServicesGrid = () => {
  const [animatedItems, setAnimatedItems] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animation when section comes into view
            const items = entry.target.querySelectorAll('.service-card');
            items.forEach((item, index) => {
              setTimeout(() => {
                setAnimatedItems((prev) => [...prev, `card-${index}`]);
              }, index * 150); // Stagger animation
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="services" className="py-20 px-4 scroll-mt-20" ref={sectionRef}> {/* Added id and scroll-mt */}
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solutions</h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive IT consulting services tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`service-card glass-effect rounded-xl overflow-hidden transition-all duration-500 ${
                animatedItems.includes(`card-${index}`) 
                  ? 'opacity-100 transform-none' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="p-8 h-full flex flex-col">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} p-4 flex items-center justify-center text-white mb-6 transform transition-transform duration-300 hover:scale-110`}>
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                <ScrollLink 
                  to="contact" 
                  spy={true} 
                  smooth={true} 
                  offset={-70} 
                  duration={500} 
                  className="text-teknow-teal hover:text-teknow-purple font-medium transition-colors cursor-pointer" /* tekmo to teknow */
                >
                  Learn More →
                </ScrollLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;


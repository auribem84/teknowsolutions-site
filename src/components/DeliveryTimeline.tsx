
import { useState, useEffect, useRef } from "react";
import { Search, Lightbulb, Rocket, Headphones } from "lucide-react";

const timelineSteps = [
  {
    icon: Search,
    title: "Assess",
    description: "In-depth analysis of your current IT infrastructure and needs",
    color: "bg-tekmo-teal",
  },
  {
    icon: Lightbulb,
    title: "Design",
    description: "Custom solution architecture based on best practices",
    color: "bg-tekmo-purple",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Seamless implementation with minimal disruption",
    color: "bg-tekmo-orange",
  },
  {
    icon: Headphones,
    title: "Support",
    description: "Ongoing maintenance and 24/7 technical assistance",
    color: "bg-tekmo-blue",
  },
];

const DeliveryTimeline = () => {
  const [active, setActive] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActive((prev) => (prev === timelineSteps.length - 1 ? 0 : prev + 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4" ref={timelineRef}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Deliver</h2>
          <p className="text-muted-foreground text-lg">
            Our proven methodology ensures successful project implementation
          </p>
        </div>

        <div className={`relative max-w-5xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2 rounded-full"></div>
          
          {/* Timeline Steps */}
          <div className="flex justify-between relative">
            {timelineSteps.map((step, index) => (
              <div 
                key={step.title} 
                className={`flex flex-col items-center transition-all duration-500 ${
                  index === active ? 'scale-110' : 'opacity-70'
                }`}
              >
                {/* Step Circle */}
                <div 
                  className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center text-white z-10 transition-all duration-500 ${step.color} ${
                    index === active ? 'shadow-lg scale-110' : ''
                  }`}
                >
                  <step.icon size={24} />
                </div>
                
                {/* Step Content */}
                <div className="text-center max-w-[150px]">
                  <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                
                {/* Progress Indicator */}
                {index < timelineSteps.length - 1 && (
                  <div className={`absolute top-8 left-0 h-1 bg-gradient-to-r from-tekmo-teal to-tekmo-purple rounded-full transition-all duration-1000 ease-out ${
                    index < active ? 'opacity-100' : 'opacity-0'
                  }`} style={{
                    width: `${(100 / (timelineSteps.length - 1)) * (active < index ? 0 : 1)}%`,
                    left: `${(100 / (timelineSteps.length - 1)) * index}%`,
                  }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryTimeline;


import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Tekmowsolutions transformed our IT infrastructure. Their cloud migration strategy saved us 40% on operating costs while improving performance.",
    name: "Sarah Johnson",
    title: "CTO, RetailPlus Inc.",
    rating: 5,
  },
  {
    quote: "The security audit and implementation from Tekmowsolutions helped us achieve compliance and protect our sensitive data. Excellent service!",
    name: "Michael Chang",
    title: "Director of IT, HealthCare Systems",
    rating: 5,
  },
  {
    quote: "Their process automation solutions eliminated repetitive tasks and increased our team's productivity by over 60%. Highly recommended!",
    name: "David Rodriguez",
    title: "Operations Manager, Manufacturing Co.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        goToNext();
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section className="py-20 px-4" ref={sectionRef}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground text-lg">
            Trusted by businesses across industries
          </p>
        </div>

        <div className={`relative glass-effect rounded-2xl p-8 md:p-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl">
            <div className="absolute top-0 left-0 w-32 h-32 bg-tekmo-teal/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-tekmo-purple/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400" size={28} />
              ))}
            </div>

            <div className="overflow-hidden">
              <div
                className="transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <div className="flex">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="min-w-full px-4"
                    >
                      <blockquote className="text-xl md:text-2xl text-center mb-8 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="text-center">
                        <p className="font-bold text-lg">{testimonial.name}</p>
                        <p className="text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-12 gap-4">
              <button 
                onClick={goToPrev} 
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={goToNext} 
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
                aria-label="Next testimonial"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-tekmo-teal' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

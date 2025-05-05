
import { useState, useEffect, useRef } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  title: string;
  isVisible: boolean;
}

const Counter = ({ end, suffix = "", prefix = "", duration = 2000, title, isVisible }: CounterProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | null = null;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));
      
      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return (
    <div className={`text-center transition-all duration-700 ${isVisible ? 'animate-counter' : 'opacity-0'}`}>
      <div className="text-4xl md:text-5xl font-bold mb-2 text-tekmo-teal">
        {prefix}{count}{suffix}
      </div>
      <p className="text-muted-foreground">{title}</p>
    </div>
  );
};

const Metrics = () => {
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

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-tekmo-blue/5 to-tekmo-purple/5">
      <div className="container mx-auto" ref={sectionRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Counter
            end={500}
            suffix="+"
            title="Servers Migrated"
            isVisible={isVisible}
          />
          <Counter
            end={99.9}
            suffix="%"
            title="SLA Achieved"
            isVisible={isVisible}
            duration={2500}
          />
          <Counter
            end={120}
            suffix="+"
            title="Automations Delivered"
            isVisible={isVisible}
            duration={3000}
          />
          <Counter
            end={50}
            suffix="%"
            title="Average Cost Reduction"
            isVisible={isVisible}
            duration={3500}
          />
        </div>
      </div>
    </section>
  );
};

export default Metrics;

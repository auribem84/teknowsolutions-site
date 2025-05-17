
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import FloatingActionButton from '@/components/FloatingActionButton';
import { setupScrollAnimation } from '@/utils/scrollAnimation';
import AboutSection from '@/components/AboutSection'; // Import the new component

const Index = () => {
  useEffect(() => {
    // Setup scroll animations
    const cleanup = setupScrollAnimation();
    
    // Clean up event listener on component unmount
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20"> {/* Adjusted pt for fixed navbar */}
        <Hero /> {/* id="home" is inside Hero component */}
        <AboutSection /> {/* Use the new AboutSection component */}
        <ServicesGrid /> {/* id="services" is inside ServicesGrid component */}
        <CTA /> {/* id="contact" is inside CTA component */}
      </main>
      
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;


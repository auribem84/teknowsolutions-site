
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import DeliveryTimeline from '@/components/DeliveryTimeline';
import Metrics from '@/components/Metrics';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import FloatingActionButton from '@/components/FloatingActionButton';
import { setupScrollAnimation } from '@/utils/scrollAnimation';

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
      
      <main className="flex-grow">
        <Hero />
        <ServicesGrid />
        <DeliveryTimeline />
        <Metrics />
        <Testimonials />
        <CTA />
      </main>
      
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;

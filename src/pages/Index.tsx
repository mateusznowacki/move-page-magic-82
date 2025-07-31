
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import AreasSection from '@/components/AreasSection';

const Index: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <AreasSection />
      <Contact />
      <Footer />
      <WhatsAppButton phoneNumber="4915223031473" />
      <ScrollToTop />
    </div>
  );
};

export default Index;


import React from 'react';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold text-moving-dark mb-4">{t('services.title')}</h1>
            <p className="text-gray-600">
              {t('services.description')}
            </p>
          </div>
        </div>
      </div>
      <Services />
      <Footer />
      <WhatsAppButton phoneNumber="4915223031473" />
      <ScrollToTop />
    </div>
  );
};

export default ServicesPage;

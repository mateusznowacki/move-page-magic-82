
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import TestimonialCard from './TestimonialCard';

const Testimonials: React.FC = () => {
  const { t, getTestimonialData } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const testimonials = getTestimonialData();

  return (
    <section id="testimonials" className="section-padding bg-slate-50" role="main" aria-labelledby="testimonials-heading">
      <div className="container">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="testimonials-heading" className="sr-only">{t('testimonials.title')}</h2>
          <h3 className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-800">{t('testimonials.subtitle')}</h3>
          <p className="text-slate-600">
            {t('testimonials.description')}
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12" role="list">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            className="bg-moving-blue hover:bg-moving-darkblue text-white font-semibold py-3 px-8 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={scrollToContact}
            aria-label={t('testimonials.getFreeQuote')}
          >
            {t('testimonials.getFreeQuote')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

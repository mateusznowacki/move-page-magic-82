
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import TestimonialCard from './TestimonialCard';

const Testimonials: React.FC = () => {
  const { t, getTestimonialData } = useLanguage();
  const testimonials = getTestimonialData();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="section-padding bg-moving-lightblue" role="main" aria-labelledby="testimonials-heading">
      <div className="container">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="testimonials-heading" className="section-subtitle">{t('testimonials.title')}</h2>
          <h3 className="section-title">{t('testimonials.subtitle')}</h3>
          <p className="text-gray-600">
            {t('testimonials.description')}
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        
        <aside className="mt-12 text-center">
          <div className="bg-moving-blue text-white rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{t('testimonials.ready')}</h3>
            <p className="mb-6 opacity-90">{t('testimonials.getInTouch')}</p>
            <button 
              className="bg-white text-moving-blue font-medium py-3 px-8 rounded-md hover:bg-moving-lightblue hover:text-moving-darkblue transition-colors duration-300"
              onClick={scrollToContact}
              aria-label={t('testimonials.getFreeQuote')}
            >
              {t('testimonials.getFreeQuote')}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Testimonials;

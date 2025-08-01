
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const About: React.FC = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToQuote = () => {
    window.location.href = '/angebot';
  };

  return (
    <section id="about" className="section-padding" role="main" aria-labelledby="about-heading">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <header className="mb-6">
              <h2 id="about-heading" className="sr-only">{t('about.title')}</h2>
              <h3 className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">{t('about.subtitle')}</h3>
              <p className="text-gray-700 mb-6 text-lg">
                {t('about.description')}
              </p>
            </header>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="mr-4 bg-moving-lightblue p-2 rounded-full h-max mt-1" role="img" aria-label="Ikona checkmark">
                  <svg className="w-5 h-5 text-moving-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 text-moving-dark">{t('about.feature1.title')}</h4>
                  <p className="text-gray-700">{t('about.feature1.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-moving-lightblue p-2 rounded-full h-max mt-1" role="img" aria-label="Ikona checkmark">
                  <svg className="w-5 h-5 text-moving-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 text-moving-dark">{t('about.feature2.title')}</h4>
                  <p className="text-gray-700">{t('about.feature2.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-moving-lightblue p-2 rounded-full h-max mt-1" role="img" aria-label="Ikona checkmark">
                  <svg className="w-5 h-5 text-moving-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg mb-2 text-moving-dark">{t('about.feature3.title')}</h4>
                  <p className="text-gray-700">{t('about.feature3.description')}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-moving-blue hover:bg-moving-darkblue text-white font-semibold py-3 px-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={scrollToContact}
                aria-label={t('about.contactUs')}
              >
                {t('about.contactUs')}
              </Button>
              <Button 
                className="btn-secondary bg-white hover:bg-gray-50 text-moving-blue border-2 border-moving-blue font-semibold py-3 px-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={scrollToQuote}
                aria-label={t('about.getStarted')}
              >
                {t('about.getStarted')}
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="/optimized/movecompany-in-action.webp" 
                alt="Profesjonalny zespół przeprowadzkowy w akcji - pakowanie i transport mebli"
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center">
                  <div className="flex text-yellow-400" role="img" aria-label="Ocena 5 gwiazdek">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-lg text-moving-dark">4.9</div>
                    <p className="text-sm text-gray-700">{t('hero.customers')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

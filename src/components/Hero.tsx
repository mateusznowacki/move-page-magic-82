
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';
import { BadgePercent } from 'lucide-react';
import HeroSlider from './HeroSlider';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    // Google Ads conversion tracking
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17470976934/DHe6CPb61oUbEKbn54pB',
        'value': 1.0,
        'currency': 'PLN'
      });
    }
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center" role="banner">
      <HeroSlider />
      
      <div className="relative z-20 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-8 text-white text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl opacity-90 mb-6 sm:mb-8 px-4 sm:px-0">
              {t('hero.subtitle')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 sm:px-0">
              <Button 
                className="bg-moving-blue hover:bg-moving-darkblue text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={scrollToContact}
                aria-label="Uzyskaj bezpłatną wycenę przeprowadzki"
              >
                {t('hero.getQuote')}
              </Button>
              <Button 
                className="bg-moving-blue hover:bg-moving-darkblue text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105" 
                onClick={scrollToServices}
                aria-label="Zobacz nasze usługi przeprowadzkowe"
              >
                {t('hero.services')}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end lg:pr-16 px-4 sm:px-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-lg w-full max-w-sm">
              <div className="flex items-center mb-3 sm:mb-4">
                <BadgePercent className="w-6 h-6 sm:w-8 sm:h-8 text-moving-blue mr-2 sm:mr-3" />
                <div>
                  <Badge variant="default" className="bg-moving-blue text-white mb-1 sm:mb-2 text-xs sm:text-sm">
                    {t('footer.promotionTitle')}
                  </Badge>
                  <div className="flex items-center">
                    <span className="text-2xl sm:text-3xl font-bold text-moving-blue">10%</span>
                    <span className="text-sm sm:text-base font-semibold ml-1 sm:ml-2 text-slate-800">{t('footer.discount')}</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-800 text-xs sm:text-sm mb-3 leading-relaxed">{t('footer.promotionDescription')}</p>
              <div className="text-xs sm:text-sm text-gray-700">
                {t('footer.promotionTerms')}
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex mt-6 sm:mt-8 md:mt-12 bg-white rounded-lg p-4 md:p-6 gap-4 md:gap-8 shadow-lg mx-4 sm:mx-0 w-fit mx-auto">
          <div className="flex items-center gap-3 justify-center">
            <div className="bg-moving-blue rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white text-lg sm:text-xl font-bold flex-shrink-0" aria-label="10 lat doświadczenia">
              {t('hero.years')}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{t('hero.yearsDesc')}</h3>
              <p className="text-xs sm:text-sm text-gray-700">{t('hero.experienceText')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 justify-center">
            <div className="bg-moving-blue rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white text-lg sm:text-xl font-bold flex-shrink-0" aria-label="Ponad 5000 zadowolonych klientów">
              {t('hero.customers')}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{t('hero.customersDesc')}</h3>
              <p className="text-xs sm:text-sm text-gray-700">{t('hero.acrossGermany')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 justify-center">
            <div className="bg-moving-blue rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white text-lg sm:text-xl font-bold flex-shrink-0" aria-label="Całodobowe wsparcie">
              {t('hero.support')}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{t('hero.supportDesc')}</h3>
              <p className="text-xs sm:text-sm text-gray-700">{t('hero.alwaysReady')}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

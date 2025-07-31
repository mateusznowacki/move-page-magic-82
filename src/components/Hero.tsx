
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';
import { BadgePercent } from 'lucide-react';
import HeroSlider from './HeroSlider';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
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
    <section className="relative min-h-screen flex items-center pt-16" role="banner">
      <HeroSlider />
      
      <div className="container relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-8 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              {t('hero.title')}
            </h1>
            <h2 className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
              {t('hero.subtitle')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Button 
                className="btn-primary text-lg"
                onClick={scrollToContact}
                aria-label="Uzyskaj bezpłatną wycenę przeprowadzki"
              >
                {t('hero.getQuote')}
              </Button>
              <Button 
                className="bg-white text-moving-darkblue hover:bg-moving-lightblue text-lg" 
                variant="outline"
                onClick={scrollToServices}
                aria-label="Zobacz nasze usługi przeprowadzkowe"
              >
                {t('hero.services')}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end lg:pr-16">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-fade-in max-w-xs" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center mb-3">
                <BadgePercent className="w-6 h-6 text-moving-blue mr-2" />
                <div>
                  <Badge variant="default" className="bg-moving-blue text-white mb-1 text-xs">
                    {t('footer.promotionTitle')}
                  </Badge>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-moving-blue">10%</span>
                    <span className="text-sm font-semibold ml-1 text-moving-dark">{t('footer.discount')}</span>
                  </div>
                </div>
              </div>
              <p className="text-moving-dark text-xs mb-3">{t('footer.promotionDescription')}</p>
              <div className="text-xs text-gray-600">
                {t('footer.promotionTerms')}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-8 animate-fade-in" style={{animationDelay: '0.8s'}}>
          <div className="flex items-center gap-4">
            <div className="bg-moving-blue rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold" aria-label="15 lat doświadczenia">
              {t('hero.years')}
            </div>
            <div>
              <h3 className="font-semibold">{t('hero.yearsDesc')}</h3>
              <p className="text-sm opacity-80">Profesjonalne usługi przeprowadzkowe</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-moving-blue rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold" aria-label="Ponad 5000 zadowolonych klientów">
              {t('hero.customers')}
            </div>
            <div>
              <h3 className="font-semibold">{t('hero.customersDesc')}</h3>
              <p className="text-sm opacity-80">W całym kraju</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-moving-blue rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold" aria-label="Całodobowe wsparcie">
              {t('hero.support')}
            </div>
            <div>
              <h3 className="font-semibold">{t('hero.supportDesc')}</h3>
              <p className="text-sm opacity-80">Zawsze gotowi pomóc</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

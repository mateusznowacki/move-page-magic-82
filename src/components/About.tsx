
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import FeatureCard from './FeatureCard';

const features = [
  {
    id: 1,
    title: "Doświadczony zespół",
    description: "Nasi profesjonalni przeprowadzkowcy mają wieloletnie doświadczenie we wszystkich typach relokacji."
  },
  {
    id: 2,
    title: "Rozwiązania na miarę",
    description: "Tworzymy spersonalizowane plany przeprowadzek dostosowane do Twoich specyficznych wymagań."
  },
  {
    id: 3,
    title: "Przystępne ceny",
    description: "Przejrzyste ceny bez ukrytych opłat, aby zapewnić najlepszą wartość."
  },
  {
    id: 4,
    title: "Ubezpieczone usługi",
    description: "Pełne ubezpieczenie Twoich rzeczy podczas całego procesu przeprowadzki."
  },
];

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding" role="main" aria-labelledby="about-heading">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <header>
              <h2 id="about-heading" className="sr-only">{t('about.title')}</h2>
              <h3 className="section-title text-3xl md:text-4xl lg:text-5xl">{t('about.subtitle')}</h3>
              <p className="text-gray-600 mb-6 text-lg">
                {t('about.description')}
              </p>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8" role="list">
              {features.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                className="btn-primary text-lg px-8 py-3"
                aria-label={t('about.getStarted')}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('about.getStarted')}
              </Button>
              <Button 
                className="btn-secondary text-lg px-8 py-3"
                aria-label={t('about.contactUs')}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('about.contactUs')}
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/movecompany-in-action.png" 
              alt="Profesjonalni przeprowadzkowcy podczas pracy - zespół Umzuge Meister niesie meble" 
              className="rounded-lg w-full h-auto object-cover shadow-lg"
              loading="lazy"
            />
            <aside className="absolute -bottom-8 -left-8 bg-white rounded-lg p-6 shadow-lg max-w-xs">
              <div className="flex items-center mb-4">
                <div className="flex -space-x-2">
                  <img 
                    className="w-10 h-10 rounded-full border-2 border-white" 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Zadowolony klient przeprowadzki" 
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                  <img 
                    className="w-10 h-10 rounded-full border-2 border-white" 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Zadowolony klient przeprowadzki" 
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                  <img 
                    className="w-10 h-10 rounded-full border-2 border-white" 
                    src="https://randomuser.me/api/portraits/men/46.jpg" 
                    alt="Zadowolony klient przeprowadzki" 
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-moving-blue font-medium">{t('testimonials.trustedUs')}</p>
                  <p className="text-sm text-gray-600">{t('hero.customers')}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400" role="img" aria-label="Ocena 5 gwiazdek">
                  ★★★★★
                </div>
                <p className="ml-2 text-sm font-medium">4.9 (567 opinii)</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

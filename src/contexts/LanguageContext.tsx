
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, serviceTranslations, testimonialTranslations } from '@/lib/translations';

type Language = 'en' | 'pl' | 'de' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations) => string;
  getServiceData: () => any[];
  getTestimonialData: () => any[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (savedLanguage && ['en', 'pl', 'de', 'es'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Pobierz język przeglądarki
      const browserLanguage = navigator.language.toLowerCase();
      let detectedLanguage: Language = 'en';
      
      if (browserLanguage.startsWith('pl')) {
        detectedLanguage = 'pl';
      } else if (browserLanguage.startsWith('de')) {
        detectedLanguage = 'de';
      } else if (browserLanguage.startsWith('es')) {
        detectedLanguage = 'es';
      } else if (browserLanguage.startsWith('en')) {
        detectedLanguage = 'en';
      }
      
      console.log(`Detected browser language: ${browserLanguage}, setting to: ${detectedLanguage}`);
      setLanguage(detectedLanguage);
      localStorage.setItem('preferredLanguage', detectedLanguage);
    }
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    console.log(`Language changed to: ${newLanguage}`);
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][language];
  };

  const getServiceData = () => {
    return serviceTranslations[language];
  };

  const getTestimonialData = () => {
    return testimonialTranslations[language];
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage, 
        t, 
        getServiceData, 
        getTestimonialData 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

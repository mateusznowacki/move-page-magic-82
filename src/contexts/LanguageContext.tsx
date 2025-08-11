
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
  const [language, setLanguage] = useState<Language>('de');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (savedLanguage && ['en', 'pl', 'de', 'es'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Domyślnie ustawiamy język niemiecki
      setLanguage('de');
      localStorage.setItem('preferredLanguage', 'de');
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


import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MapProps {
  mapType: 'berlin' | 'germany';
}

const Map: React.FC<MapProps> = ({ mapType }) => {
  const { language } = useLanguage();
  
  // Define settings for each map type
  const mapSettings = {
    berlin: {
      image: '/berlin-map.png',
      title: {
        en: 'Berlin Districts',
        pl: 'Dzielnice Berlina',
        de: 'Berliner Bezirke',
        es: 'Distritos de Berlín'
      }
    },
    germany: {
      image: '/germany-map.png',
      title: {
        en: 'German Federal States',
        pl: 'Niemieckie kraje związkowe',
        de: 'Deutsche Bundesländer',
        es: 'Estados federados de Alemania'
      }
    }
  };

  const currentTitle = mapSettings[mapType].title[language as keyof typeof mapSettings.berlin.title] || 
                      mapSettings[mapType].title.en;

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-lg shadow-lg overflow-hidden">
        <img 
          src={mapSettings[mapType].image}
          alt={currentTitle}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Map;


import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface MapProps {
  mapType: 'berlin' | 'germany' | 'google';
  geoJsonData?: any;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ mapType, geoJsonData, center = { lat: 52.5200, lng: 13.4050 }, zoom = 10 }) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  
  // Define settings for each map type
  const mapSettings = {
    berlin: {
      image: isMobile ? '/berlin-map-mobile.png' : '/berlin-map.png',
      title: {
        en: 'Berlin Districts',
        pl: 'Dzielnice Berlina',
        de: 'Berliner Bezirke',
        es: 'Distritos de Berlín'
      }
    },
    germany: {
      image: isMobile ? '/germany-map-mobile.png' : '/germany-map.png',
      title: {
        en: 'German Federal States',
        pl: 'Niemieckie kraje związkowe',
        de: 'Deutsche Bundesländer',
        es: 'Estados federados de Alemania'
      }
    }
  };

  const currentTitle = mapType !== 'google' ? 
    (mapSettings[mapType].title[language as keyof typeof mapSettings.berlin.title] || 
     mapSettings[mapType].title.en) : 'Interactive Map';

  if (mapType === 'google') {
    const geoJsonUrl = geoJsonData ? `&data=${encodeURIComponent(JSON.stringify(geoJsonData))}` : '';
    const mapUrl = `https://maps.google.com/maps?q=${center.lat},${center.lng}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed${geoJsonUrl}`;
    
    return (
      <div className="w-full">
        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-lg shadow-lg overflow-hidden">
          <iframe 
            width="100%" 
            height="100%" 
            src={mapUrl}
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0}
            title={currentTitle}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-lg shadow-lg overflow-hidden">
        <img 
          src={mapSettings[mapType].image}
          alt={currentTitle}
          className={`w-full h-full ${isMobile ? 'object-contain' : 'object-cover'} object-center`}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Map;

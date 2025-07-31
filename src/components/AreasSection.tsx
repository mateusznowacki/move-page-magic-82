
import React from 'react';
import { MapPin, Signpost } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Map from '@/components/Map';

const AreasSection: React.FC = () => {
  const { language } = useLanguage();

  const getTitle = (key: string) => {
    const translations = {
      coverage: {
        en: "Our Coverage",
        pl: "Nasze obszary działania",
        de: "Unsere Abdeckung",
        es: "Nuestra cobertura"
      },
      areas: {
        en: "Areas of Operation",
        pl: "Obszary działania", 
        de: "Einsatzgebiete",
        es: "Áreas de operación"
      },
      berlinDistricts: {
        en: "Berlin Districts",
        pl: "Dzielnice Berlina",
        de: "Berliner Bezirke", 
        es: "Distritos de Berlín"
      },
      germanStates: {
        en: "German Federal States",
        pl: "Niemieckie kraje związkowe",
        de: "Deutsche Bundesländer",
        es: "Estados federados de Alemania"
      }
    };
    return translations[key as keyof typeof translations][language];
  };

  const getDescription = (key: string) => {
    const descriptions = {
      berlin: {
        en: "We provide comprehensive moving services in all Berlin districts with express options available.",
        pl: "Oferujemy kompleksowe usługi przeprowadzkowe we wszystkich dzielnicach Berlina z dostępnymi opcjami ekspresowymi.",
        de: "Wir bieten umfassende Umzugsdienste in allen Berliner Bezirken mit verfügbaren Express-Optionen an.",
        es: "Proporcionamos servicios de mudanza completos en todos los distritos de Berlín con opciones express disponibles."
      },
      germany: {
        en: "Our long-distance moving services cover all German federal states with guaranteed delivery times.",
        pl: "Nasze usługi przeprowadzkowe na długie dystanse obejmują wszystkie niemieckie kraje związkowe z gwarantowanymi terminami dostawy.",
        de: "Unsere Fernumzugsdienste decken alle deutschen Bundesländer mit garantierten Lieferzeiten ab.",
        es: "Nuestros servicios de mudanza de larga distancia cubren todos los estados federados de Alemania con tiempos de entrega garantizados."
      }
    };
    return descriptions[key as keyof typeof descriptions][language];
  };

  return (
    <section id="areas" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="sr-only">{getTitle('coverage')}</h2>
          <h3 className="section-title">{getTitle('areas')}</h3>
        </div>
        
        {/* Berlin Map Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-moving-lightblue p-3 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-moving-blue" />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold mb-4">
              {getTitle('berlinDistricts')}
            </h4>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              {getDescription('berlin')}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <Map mapType="berlin" />
          </div>
        </div>
        
        {/* German States Map Section */}
        <div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-moving-lightblue p-3 rounded-full mb-4">
              <Signpost className="h-8 w-8 text-moving-blue" />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold mb-4">
              {getTitle('germanStates')}
            </h4>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              {getDescription('germany')}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <Map mapType="germany" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;


import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Signpost } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy load Map component
const Map = React.lazy(() => import('@/components/Map'));

const AreasSection: React.FC = () => {
  const { language } = useLanguage();
  const [visibleMaps, setVisibleMaps] = useState<{ berlin: boolean; germany: boolean }>({
    berlin: false,
    germany: false
  });
  
  const berlinRef = useRef<HTMLDivElement>(null);
  const germanyRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading maps with delay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const mapType = entry.target.getAttribute('data-map-type');
            
            // Add a small delay to prioritize other content
            setTimeout(() => {
              if (mapType === 'berlin') {
                setVisibleMaps(prev => ({ ...prev, berlin: true }));
              } else if (mapType === 'germany') {
                setVisibleMaps(prev => ({ ...prev, germany: true }));
              }
            }, 100);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (berlinRef.current) {
      observer.observe(berlinRef.current);
    }
    if (germanyRef.current) {
      observer.observe(germanyRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
        <div className="mb-16" ref={berlinRef} data-map-type="berlin">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-blue-100 p-3 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold mb-4">
              {getTitle('berlinDistricts')}
            </h4>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              {getDescription('berlin')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              {[
                'Mitte', 'Friedrichshain-Kreuzberg', 'Pankow', 'Charlottenburg-Wilmersdorf',
                'Spandau', 'Steglitz-Zehlendorf', 'Tempelhof-Schöneberg', 'Neukölln',
                'Treptow-Köpenick', 'Marzahn-Hellersdorf', 'Lichtenberg', 'Reinickendorf'
              ].map((district) => (
                <button key={district} className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg p-3 text-center transition-colors duration-300 font-medium text-sm md:text-base">
                  {district}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {visibleMaps.berlin ? (
              <React.Suspense fallback={
                <div className="w-full h-[400px] rounded-lg bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600 text-sm">Ładowanie mapy Berlina...</p>
                  </div>
                </div>
              }>
                <Map mapType="berlin" />
              </React.Suspense>
            ) : (
              <div className="w-full h-[400px] rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Ładowanie mapy Berlina...</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* German States Map Section */}
        <div ref={germanyRef} data-map-type="germany">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-blue-100 p-3 rounded-full mb-4">
              <Signpost className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold mb-4">
              {getTitle('germanStates')}
            </h4>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              {getDescription('germany')}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {visibleMaps.germany ? (
              <React.Suspense fallback={
                <div className="w-full h-[400px] rounded-lg bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600 text-sm">Ładowanie mapy Niemiec...</p>
                  </div>
                </div>
              }>
                <Map mapType="germany" />
              </React.Suspense>
            ) : (
              <div className="w-full h-[400px] rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Ładowanie mapy Niemiec...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;

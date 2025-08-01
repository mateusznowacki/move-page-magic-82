import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, ChevronLeft, Search, Building } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface City {
  name: string;
  slug: string;
}

interface StateData {
  name: string;
  slug: string;
  cities: City[];
}

const StateCitiesPage: React.FC = () => {
  const { stateSlug } = useParams<{ stateSlug: string }>();
  const { t, language } = useLanguage();
  const [stateData, setStateData] = useState<StateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadStateCities = async () => {
      if (!stateSlug) return;
      
      try {
        const response = await fetch(`/data/cities/${stateSlug}.json`);
        
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status} for ${stateSlug}`);
          return;
        }
        
        const cities: City[] = await response.json();
        
        if (Array.isArray(cities) && cities.length > 0) {
          setStateData({
            name: getStateDisplayName(stateSlug),
            slug: stateSlug,
            cities: cities
          });
        }
      } catch (error) {
        console.error('Błąd podczas ładowania miast:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStateCities();
  }, [stateSlug]);

  const getStateDisplayName = (stateSlug: string) => {
    const stateNames: { [key: string]: string } = {
      'baden-wuerttemberg': 'Baden-Württemberg',
      'bavaria': 'Bayern',
      'berlin': 'Berlin',
      'brandenburg': 'Brandenburg',
      'bremen': 'Bremen',
      'hamburg': 'Hamburg',
      'hesse': 'Hessen',
      'lower-saxony': 'Niedersachsen',
      'mecklenburg-western-pomerania': 'Mecklenburg-Vorpommern',
      'north-rhine-westphalia': 'Nordrhein-Westfalen',
      'rhineland-palatinate': 'Rheinland-Pfalz',
      'saarland': 'Saarland',
      'saxony': 'Sachsen',
      'saxony-anhalt': 'Sachsen-Anhalt',
      'schleswig-holstein': 'Schleswig-Holstein',
      'thuringia': 'Thüringen'
    };
    return stateNames[stateSlug] || stateSlug;
  };

  const filteredCities = stateData?.cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getHeaderText = () => {
    const texts = {
      en: {
        title: `Moving Services in ${stateData?.name || ''}`,
        subtitle: `Professional moving services in all cities of ${stateData?.name || ''}. From residential to commercial moves, we provide comprehensive relocation solutions throughout the region.`,
        searchPlaceholder: 'Search cities...',
        backToStates: 'Back to States'
      },
      pl: {
        title: `Usługi przeprowadzkowe w ${stateData?.name || ''}`,
        subtitle: `Profesjonalne usługi przeprowadzkowe we wszystkich miastach ${stateData?.name || ''}. Od przeprowadzek mieszkaniowych po komercyjne, zapewniamy kompleksowe rozwiązania relokacyjne w całym regionie.`,
        searchPlaceholder: 'Szukaj miast...',
        backToStates: 'Powrót do krajów'
      },
      de: {
        title: `Umzugsdienste in ${stateData?.name || ''}`,
        subtitle: `Professionelle Umzugsdienste in allen Städten von ${stateData?.name || ''}. Von Wohnungs- bis Geschäftsumzügen bieten wir umfassende Umzugslösungen in der gesamten Region.`,
        searchPlaceholder: 'Städte suchen...',
        backToStates: 'Zurück zu Bundesländern'
      },
      es: {
        title: `Servicios de mudanza en ${stateData?.name || ''}`,
        subtitle: `Servicios profesionales de mudanza en todas las ciudades de ${stateData?.name || ''}. Desde mudanzas residenciales hasta comerciales, proporcionamos soluciones completas de reubicación en toda la región.`,
        searchPlaceholder: 'Buscar ciudades...',
        backToStates: 'Volver a Estados'
      }
    };
    return texts[language as keyof typeof texts] || texts.en;
  };

  const getSEOData = () => {
    const stateName = stateData?.name || '';
    const seoData = {
      en: {
        title: `Moving Services in ${stateName} - Professional Relocation | Meister Umzüge 24`,
        description: `Professional moving services in ${stateName}. Residential and commercial moves, packing, furniture assembly. Over ${stateData?.cities.length || 0} cities covered. Free quote!`,
        keywords: `moving services ${stateName}, relocation ${stateName}, residential moving ${stateName}, commercial moving ${stateName}, packing services ${stateName}, furniture assembly ${stateName}, Umzug ${stateName}`
      },
      pl: {
        title: `Usługi przeprowadzkowe w ${stateName} - Profesjonalne przeprowadzki | Meister Umzüge 24`,
        description: `Profesjonalne usługi przeprowadzkowe w ${stateName}. Przeprowadzki mieszkaniowe i komercyjne, pakowanie, montaż mebli. Ponad ${stateData?.cities.length || 0} miast. Darmowa wycena!`,
        keywords: `usługi przeprowadzkowe ${stateName}, przeprowadzki ${stateName}, przeprowadzki mieszkaniowe ${stateName}, przeprowadzki komercyjne ${stateName}, pakowanie ${stateName}, montaż mebli ${stateName}`
      },
      de: {
        title: `Umzugsdienste in ${stateName} - Professionelle Umzüge | Meister Umzüge 24`,
        description: `Professionelle Umzugsdienste in ${stateName}. Wohnungs- und Geschäftsumzüge, Verpackung, Möbelmontage. Über ${stateData?.cities.length || 0} Städte abgedeckt. Kostenloses Angebot!`,
        keywords: `Umzugsdienste ${stateName}, Umzug ${stateName}, Wohnungsumzug ${stateName}, Geschäftsumzug ${stateName}, Verpackung ${stateName}, Möbelmontage ${stateName}`
      },
      es: {
        title: `Servicios de mudanza en ${stateName} - Mudanzas profesionales | Meister Umzüge 24`,
        description: `Servicios profesionales de mudanza en ${stateName}. Mudanzas residenciales y comerciales, embalaje, montaje de muebles. Más de ${stateData?.cities.length || 0} ciudades cubiertas. ¡Presupuesto gratuito!`,
        keywords: `servicios de mudanza ${stateName}, mudanzas ${stateName}, mudanzas residenciales ${stateName}, mudanzas comerciales ${stateName}, embalaje ${stateName}, montaje de muebles ${stateName}`
      }
    };
    return seoData[language as keyof typeof seoData] || seoData.en;
  };

  if (loading) {
    const seoData = getSEOData();
    return (
      <>
        <SEOHead 
          title={seoData.title}
          description={seoData.description}
          keywords={seoData.keywords}
        />
        <div className="min-h-screen bg-moving-gray flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-moving-blue mx-auto mb-4"></div>
            <p className="text-moving-dark">Ładowanie miast...</p>
          </div>
        </div>
      </>
    );
  }

  if (!stateData) {
    return (
      <div className="min-h-screen bg-moving-gray flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-moving-dark mb-4">Land nie został znaleziony</h1>
          <Link to="/staedte" className="text-moving-blue hover:underline">
            Powrót do listy landów
          </Link>
        </div>
      </div>
    );
  }

  const headerText = getHeaderText();
  const seoData = getSEOData();

  return (
    <>
      <SEOHead 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      <div className="min-h-screen bg-moving-gray">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/staedte" 
              className="inline-flex items-center text-moving-blue hover:text-moving-dark transition-colors mb-4"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {headerText.backToStates}
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-moving-dark mb-6">
              {headerText.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl leading-relaxed">
              {headerText.subtitle}
            </p>
          </div>

          {/* Statystyki */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Building className="w-8 h-8 text-moving-blue mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Federal State</p>
                    <p className="text-2xl font-bold text-moving-dark">
                      {stateData.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <MapPin className="w-8 h-8 text-moving-blue mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Total Cities</p>
                    <p className="text-2xl font-bold text-moving-dark">
                      {stateData.cities.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <MapPin className="w-8 h-8 text-moving-blue mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Coverage</p>
                    <p className="text-2xl font-bold text-moving-dark">
                      100%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Wyszukiwarka */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={headerText.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-moving-blue focus:border-transparent"
              />
            </div>
          </div>

          {/* Lista miast */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCities.map((city) => (
              <Link
                key={city.slug}
                to={`/staedte/${stateSlug}/${city.slug}`}
                className="block"
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-moving-dark mb-2">
                          {city.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {stateData.name}
                        </p>
                      </div>
                      <MapPin className="w-5 h-5 text-moving-blue" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredCities.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Nie znaleziono miast pasujących do wyszukiwania "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StateCitiesPage; 
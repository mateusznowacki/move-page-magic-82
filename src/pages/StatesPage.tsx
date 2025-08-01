import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Users, Building, ChevronRight, Globe } from 'lucide-react';
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

const StatesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [statesData, setStatesData] = useState<StateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedState, setExpandedState] = useState<string | null>(null);

  useEffect(() => {
    const loadStates = async () => {
      try {
        // Lista 6 landów niemieckich
        const stateFiles = [
          'berlin',
          'brandenburg',
          'mecklenburg-western-pomerania',
          'saxony',
          'saxony-anhalt',
          'thuringia'
        ];

        const states: StateData[] = [];
        
        for (const stateFile of stateFiles) {
          try {
            const response = await fetch(`/data/cities/${stateFile}.json`);
            
            if (!response.ok) {
              console.error(`HTTP error! status: ${response.status} for ${stateFile}`);
              continue;
            }
            
            const cities: City[] = await response.json();
            
            if (Array.isArray(cities) && cities.length > 0) {
              states.push({
                name: getStateDisplayName(stateFile),
                slug: stateFile,
                cities: cities
              });
            }
          } catch (error) {
            console.error(`Błąd podczas ładowania ${stateFile}:`, error);
          }
        }

        // Sortuj według liczby miast (malejąco)
        states.sort((a, b) => b.cities.length - a.cities.length);
        
        setStatesData(states);
      } catch (error) {
        console.error('Błąd podczas ładowania danych landów:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStates();
  }, []);

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

  const toggleState = (stateSlug: string) => {
    setExpandedState(expandedState === stateSlug ? null : stateSlug);
  };

  const getHeaderText = () => {
    const texts = {
      en: {
        title: "German Cities",
        subtitle: "Discover our comprehensive moving services across all German cities. From Berlin to Munich, Hamburg to Cologne - we serve over 2000 cities throughout Germany with professional relocation services.",
        stats: {
          states: "Federal States",
          cities: "Total Cities",
          coverage: "Coverage"
        }
      },
      pl: {
        title: "Niemieckie miasta",
        subtitle: "Odkryj nasze kompleksowe usługi przeprowadzkowe w 6 krajach związkowych. Od Berlina po Drezno, od Brandenburgii po Turyngię - obsługujemy ponad 2000 miast w regionie wschodnich Niemiec z profesjonalnymi usługami przeprowadzkowymi.",
        stats: {
          states: "Kraje związkowe",
          cities: "Łącznie miast",
          coverage: "Pokrycie"
        }
      },
      de: {
        title: "Deutsche Städte",
        subtitle: "Entdecken Sie unsere umfassenden Umzugsdienste in 6 Bundesländern. Von Berlin bis Dresden, von Brandenburg bis Thüringen - wir bedienen über 2000 Städte in der ostdeutschen Region mit professionellen Umzugsdiensten.",
        stats: {
          states: "Bundesländer",
          cities: "Städte insgesamt",
          coverage: "Abdeckung"
        }
      },
      es: {
        title: "Ciudades alemanas",
        subtitle: "Descubra nuestros servicios completos de mudanza en 6 estados federados. Desde Berlín hasta Dresde, desde Brandeburgo hasta Turingia - servimos más de 2000 ciudades en la región del este de Alemania con servicios profesionales de mudanza.",
        stats: {
          states: "Estados federados",
          cities: "Ciudades totales",
          coverage: "Cobertura"
        }
      }
    };
    return texts[language as keyof typeof texts] || texts.en;
  };

  const getSEOData = () => {
    const seoData = {
      en: {
        title: "German Cities - Moving Services | Meister Umzüge 24",
        description: "Professional moving services in 6 German federal states. From Berlin to Dresden, Brandenburg to Thuringia. Over 2000 cities covered in eastern Germany. Get your free quote today!",
        keywords: "German cities, moving services Germany, Berlin moving, Dresden moving, Brandenburg moving, Thuringia moving, relocation Germany, Umzug Deutschland, deutsche Städte, eastern Germany"
      },
      pl: {
        title: "Niemieckie miasta - Usługi przeprowadzkowe | Meister Umzüge 24",
        description: "Profesjonalne usługi przeprowadzkowe w 6 krajach związkowych. Od Berlina po Drezno, od Brandenburgii po Turyngię. Ponad 2000 miast w regionie wschodnich Niemiec. Darmowa wycena!",
        keywords: "niemieckie miasta, usługi przeprowadzkowe Niemcy, przeprowadzka Berlin, przeprowadzka Drezno, przeprowadzka Brandenburgia, przeprowadzka Turyngia, Umzug Deutschland, wschodnie Niemcy"
      },
      de: {
        title: "Deutsche Städte - Umzugsdienste | Meister Umzüge 24",
        description: "Professionelle Umzugsdienste in 6 deutschen Bundesländern. Von Berlin bis Dresden, von Brandenburg bis Thüringen. Über 2000 Städte in der ostdeutschen Region abgedeckt. Jetzt kostenloses Angebot!",
        keywords: "deutsche Städte, Umzugsdienste Deutschland, Berlin Umzug, Dresden Umzug, Brandenburg Umzug, Thüringen Umzug, Umzug Deutschland, Ostdeutschland"
      },
      es: {
        title: "Ciudades alemanas - Servicios de mudanza | Meister Umzüge 24",
        description: "Servicios profesionales de mudanza en 6 estados federados alemanes. Desde Berlín hasta Dresde, desde Brandeburgo hasta Turingia. Más de 2000 ciudades cubiertas en la región del este de Alemania. ¡Presupuesto gratuito!",
        keywords: "ciudades alemanas, servicios de mudanza Alemania, mudanza Berlín, mudanza Dresde, mudanza Brandeburgo, mudanza Turingia, Umzug Deutschland, Alemania del Este"
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
            <p className="text-moving-dark">Ładowanie danych landów...</p>
          </div>
        </div>
      </>
    );
  }

  const headerText = getHeaderText();
  const seoData = getSEOData();
  const totalCities = statesData.reduce((sum, state) => sum + state.cities.length, 0);

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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-moving-dark mb-6">
              {headerText.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {headerText.subtitle}
            </p>
          </div>

          {/* Statystyki ogólne */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Building className="w-8 h-8 text-moving-blue mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">{headerText.stats.states}</p>
                    <p className="text-2xl font-bold text-moving-dark">
                      {statesData.length}
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
                    <p className="text-sm text-gray-600">{headerText.stats.cities}</p>
                    <p className="text-2xl font-bold text-moving-dark">
                      {totalCities}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Globe className="w-8 h-8 text-moving-blue mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">{headerText.stats.coverage}</p>
                    <p className="text-2xl font-bold text-moving-dark">
                      100%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista landów z miastami */}
          <div className="space-y-6">
            {statesData.map((state) => {
              const isExpanded = expandedState === state.slug;
              
              return (
                <Card key={state.slug} className="overflow-hidden">
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleState(state.slug)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <CardTitle className="text-2xl font-bold text-moving-dark">
                          {state.name}
                        </CardTitle>
                        <Badge variant="secondary" className="text-sm">
                          {state.cities.length} {t('cities')}
                        </Badge>
                      </div>
                      <ChevronRight 
                        className={`w-6 h-6 text-moving-blue transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                  </CardHeader>
                  
                  {isExpanded && (
                    <CardContent className="p-6 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {state.cities.map((city) => (
                          <Link
                            key={`${state.slug}-${city.slug}`}
                            to={`/staedte/${state.slug}/${city.slug}`}
                            className="block p-3 bg-white rounded-lg hover:bg-moving-lightblue hover:text-moving-blue transition-colors border border-gray-200 hover:border-moving-blue"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{city.name}</span>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatesPage; 
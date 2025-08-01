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
        // Lista wszystkich landów niemieckich
        const stateFiles = [
          'baden-wuerttemberg',
          'bavaria', 
          'berlin',
          'brandenburg',
          'bremen',
          'hamburg',
          'hesse',
          'lower-saxony',
          'mecklenburg-western-pomerania',
          'north-rhine-westphalia',
          'rhineland-palatinate',
          'saarland',
          'saxony',
          'saxony-anhalt',
          'schleswig-holstein',
          'thuringia'
        ];

        const states: StateData[] = [];
        
        for (const stateFile of stateFiles) {
          try {
            const response = await fetch(`/data/cities/${stateFile}.json`);
            const cities: City[] = await response.json();
            
            states.push({
              name: getStateDisplayName(stateFile),
              slug: stateFile,
              cities: cities
            });
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
      'bavaria': 'Bavaria',
      'berlin': 'Berlin',
      'brandenburg': 'Brandenburg',
      'bremen': 'Bremen',
      'hamburg': 'Hamburg',
      'hesse': 'Hesse',
      'lower-saxony': 'Lower Saxony',
      'mecklenburg-western-pomerania': 'Mecklenburg-Western Pomerania',
      'north-rhine-westphalia': 'North Rhine-Westphalia',
      'rhineland-palatinate': 'Rhineland-Palatinate',
      'saarland': 'Saarland',
      'saxony': 'Saxony',
      'saxony-anhalt': 'Saxony-Anhalt',
      'schleswig-holstein': 'Schleswig-Holstein',
      'thuringia': 'Thuringia'
    };
    return stateNames[stateSlug] || stateSlug;
  };

  const toggleState = (stateSlug: string) => {
    setExpandedState(expandedState === stateSlug ? null : stateSlug);
  };

  const getHeaderText = () => {
    const texts = {
      en: {
        title: "German Federal States",
        subtitle: "Explore our moving services across all German federal states. Click on any state to see the cities we serve, or browse through our comprehensive coverage of 16 states and over 2000 cities throughout Germany.",
        stats: {
          states: "Federal States",
          cities: "Total Cities",
          coverage: "Coverage"
        }
      },
      pl: {
        title: "Niemieckie kraje związkowe",
        subtitle: "Poznaj nasze usługi przeprowadzkowe we wszystkich niemieckich krajach związkowych. Kliknij na dowolny kraj, aby zobaczyć miasta, które obsługujemy, lub przejrzyj nasze kompleksowe pokrycie 16 krajów i ponad 2000 miast w całych Niemczech.",
        stats: {
          states: "Kraje związkowe",
          cities: "Łącznie miast",
          coverage: "Pokrycie"
        }
      },
      de: {
        title: "Deutsche Bundesländer",
        subtitle: "Entdecken Sie unsere Umzugsdienste in allen deutschen Bundesländern. Klicken Sie auf ein Bundesland, um die Städte zu sehen, die wir bedienen, oder durchsuchen Sie unsere umfassende Abdeckung von 16 Bundesländern und über 2000 Städten in ganz Deutschland.",
        stats: {
          states: "Bundesländer",
          cities: "Städte insgesamt",
          coverage: "Abdeckung"
        }
      },
      es: {
        title: "Estados federados de Alemania",
        subtitle: "Explore nuestros servicios de mudanza en todos los estados federados de Alemania. Haga clic en cualquier estado para ver las ciudades que servimos, o navegue por nuestra cobertura integral de 16 estados y más de 2000 ciudades en toda Alemania.",
        stats: {
          states: "Estados federados",
          cities: "Ciudades totales",
          coverage: "Cobertura"
        }
      }
    };
    return texts[language as keyof typeof texts] || texts.en;
  };

  if (loading) {
    return (
      <>
        <SEOHead 
          title="German Federal States - Moving Services | Meister Umzüge 24"
          description="Explore our moving services across all 16 German federal states. Professional relocation services in Bavaria, North Rhine-Westphalia, Berlin, Hamburg and more. Get a free quote today!"
          keywords="German federal states, moving services Germany, relocation Bavaria, North Rhine-Westphalia moving, Berlin moving company, Hamburg relocation"
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
  const totalCities = statesData.reduce((sum, state) => sum + state.cities.length, 0);

  return (
    <>
      <SEOHead 
        title="German Federal States - Moving Services | Meister Umzüge 24"
        description="Explore our moving services across all 16 German federal states. Professional relocation services in Bavaria, North Rhine-Westphalia, Berlin, Hamburg and more. Get a free quote today!"
        keywords="German federal states, moving services Germany, relocation Bavaria, North Rhine-Westphalia moving, Berlin moving company, Hamburg relocation"
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
                          {state.cities.length} miast
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
                            key={city.slug}
                            to={`/cities/${state.slug}/${city.slug}`}
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
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Users, Building, ChevronRight } from 'lucide-react';

interface City {
  name: string;
  slug: string;
  population: number;
  district: string;
  coords: {
    lat: string;
    lon: string;
  };
  area: number;
}

interface CitiesData {
  [state: string]: City[];
}

const StatesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [citiesData, setCitiesData] = useState<CitiesData>({});
  const [loading, setLoading] = useState(true);
  const [expandedState, setExpandedState] = useState<string | null>(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await fetch('/data/cities/all-cities.json');
        const data = await response.json();
        setCitiesData(data);
      } catch (error) {
        console.error('Błąd podczas ładowania danych miast:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat('de-DE').format(population);
  };

  const getStateName = (state: string) => {
    const stateNames: { [key: string]: string } = {
      'Nordrhein-Westfalen': 'Nordrhein-Westfalen',
      'Baden-Württemberg': 'Baden-Württemberg',
      'Bayern': 'Bayern',
      'Niedersachsen': 'Niedersachsen',
      'Rheinland-Pfalz': 'Rheinland-Pfalz',
      'Sachsen': 'Sachsen',
      'Schleswig-Holstein': 'Schleswig-Holstein',
      'Sachsen-Anhalt': 'Sachsen-Anhalt',
      'Hessen': 'Hessen',
      'Thüringen': 'Thüringen',
      'Mecklenburg-Vorpommern': 'Mecklenburg-Vorpommern',
      'Brandenburg': 'Brandenburg',
      'Berlin': 'Berlin',
      'Saarland': 'Saarland',
      'Bremen': 'Bremen',
      'Hamburg': 'Hamburg'
    };
    return stateNames[state] || state;
  };

  const createStateSlug = (state: string) => {
    return state
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const toggleState = (state: string) => {
    setExpandedState(expandedState === state ? null : state);
  };

  const getHeaderText = () => {
    const texts = {
      en: {
        title: "Choose Your City",
        subtitle: "Click on your city and discover our comprehensive range of moving services, professional packing, furniture assembly, international moves, and storage solutions. We offer individual solutions, professional service, and consultation for your relocation throughout Germany. Request a free quote now!"
      },
      pl: {
        title: "Wybierz swoje miasto",
        subtitle: "Kliknij na swoje miasto i odkryj nasze kompleksowe usługi przeprowadzkowe, profesjonalne pakowanie, montaż mebli, przeprowadzki międzynarodowe i rozwiązania magazynowe. Oferujemy indywidualne rozwiązania, profesjonalną obsługę i konsultacje dla Twojej przeprowadzki w całych Niemczech. Poproś o bezpłatną wycenę już teraz!"
      },
      de: {
        title: "Wählen Sie Ihre Stadt",
        subtitle: "Klicken Sie auf Ihre Stadt und entdecken Sie unser umfassendes Angebot an Umzugsdiensten, professioneller Verpackung, Möbelmontage, internationalen Umzügen und Lagerlösungen. Wir bieten individuelle Lösungen, professionellen Service und Beratung für Ihren Umzug in ganz Deutschland. Jetzt kostenloses Angebot anfordern!"
      },
      es: {
        title: "Elija su ciudad",
        subtitle: "Haga clic en su ciudad y descubra nuestra amplia gama de servicios de mudanza, empaquetado profesional, montaje de muebles, mudanzas internacionales y soluciones de almacenamiento. Ofrecemos soluciones individuales, servicio profesional y consultoría para su mudanza en toda Alemania. ¡Solicite un presupuesto gratuito ahora!"
      }
    };
    return texts[language as keyof typeof texts] || texts.en;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-moving-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-moving-blue mx-auto mb-4"></div>
          <p className="text-moving-dark">Ładowanie danych landów...</p>
        </div>
      </div>
    );
  }

  const headerText = getHeaderText();

  return (
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
                  <p className="text-sm text-gray-600">Landy</p>
                  <p className="text-2xl font-bold text-moving-dark">
                    {Object.keys(citiesData).length}
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
                  <p className="text-sm text-gray-600">Łącznie miast</p>
                  <p className="text-2xl font-bold text-moving-dark">
                    {Object.values(citiesData).reduce((sum, cities) => sum + cities.length, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-moving-blue mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Duże miasta</p>
                  <p className="text-2xl font-bold text-moving-dark">
                    {Object.values(citiesData).reduce((sum, cities) => 
                      sum + cities.filter(city => city.population >= 100000).length, 0
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista landów z miastami */}
        <div className="space-y-6">
          {Object.entries(citiesData).map(([state, cities]) => {
            const stateSlug = createStateSlug(state);
            const isExpanded = expandedState === state;
            
            return (
              <Card key={state} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleState(state)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <CardTitle className="text-2xl font-bold text-moving-dark">
                        {getStateName(state)}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-moving-blue text-white">
                        {cities.length} miast
                      </Badge>
                    </div>
                    <ChevronRight 
                      className={`w-6 h-6 text-moving-blue transition-transform duration-300 ${
                        isExpanded ? 'rotate-90' : ''
                      }`} 
                    />
                  </div>
                </CardHeader>
                
                {isExpanded && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {cities.slice(0, 20).map((city, index) => (
                        <Link 
                          key={`${city.slug}-${index}`} 
                          to={`/staedte/${stateSlug}/${city.slug}`}
                          className="block p-3 rounded-lg border border-gray-200 hover:border-moving-blue hover:bg-moving-lightblue transition-all duration-200 group"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-moving-dark group-hover:text-moving-blue transition-colors">
                                {city.name}
                              </h4>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-moving-blue transition-colors" />
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {cities.length > 20 && (
                      <div className="mt-6 text-center">
                        <Link 
                          to={`/staedte/${stateSlug}`}
                          className="inline-flex items-center text-moving-blue hover:text-moving-darkblue font-semibold transition-colors"
                        >
                          Zobacz wszystkie {cities.length} miast w {getStateName(state)}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatesPage; 
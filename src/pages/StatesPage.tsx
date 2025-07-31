import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Users, Building } from 'lucide-react';

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
  const { t } = useLanguage();
  const [citiesData, setCitiesData] = useState<CitiesData>({});
  const [loading, setLoading] = useState(true);

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

  const getStateStats = (cities: City[]) => {
    const totalPopulation = cities.reduce((sum, city) => sum + city.population, 0);
    const millionCities = cities.filter(city => city.population >= 1000000).length;
    const largeCities = cities.filter(city => city.population >= 100000).length;
    
    return {
      totalPopulation,
      millionCities,
      largeCities,
      totalCities: cities.length
    };
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

  return (
    <div className="min-h-screen bg-moving-gray">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-moving-dark mb-4">
            Niemieckie Landy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wybierz land, aby zobaczyć listę miast i gmin w tym regionie. 
            Każdy land zawiera miasta z populacją powyżej 20,000 mieszkańców.
          </p>
        </div>

        {/* Statystyki ogólne */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
                  <p className="text-sm text-gray-600">Milionowe miasta</p>
                  <p className="text-2xl font-bold text-moving-dark">
                    {Object.values(citiesData).reduce((sum, cities) => 
                      sum + cities.filter(city => city.population >= 1000000).length, 0
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full mr-3"></div>
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

        {/* Lista landów */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(citiesData).map(([state, cities]) => {
            const stats = getStateStats(cities);
            const stateSlug = createStateSlug(state);
            
            return (
              <Link key={state} to={`/staedte/${stateSlug}`}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-semibold text-moving-dark">
                        {getStateName(state)}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-moving-blue text-white">
                        {cities.length} miast
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Populacja:</span>
                        <span className="font-semibold text-moving-dark">
                          {formatPopulation(stats.totalPopulation)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Milionowe miasta:</span>
                        <span className="font-semibold text-red-500">
                          {stats.millionCities}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Duże miasta:</span>
                        <span className="font-semibold text-orange-500">
                          {stats.largeCities}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                          Kliknij, aby zobaczyć wszystkie miasta w {getStateName(state)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatesPage; 
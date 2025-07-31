import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MapPin, Users, Search } from 'lucide-react';

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

const CitiesPage: React.FC = () => {
  const { t } = useLanguage();
  const [citiesData, setCitiesData] = useState<CitiesData>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'population' | 'name'>('population');

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

  const formatArea = (area: number) => {
    return `${area.toFixed(1)} km²`;
  };

  const getFilteredCities = () => {
    let filteredCities: City[] = [];

    // Zbierz wszystkie miasta z wybranego landu lub wszystkich landów
    if (selectedState === 'all') {
      Object.values(citiesData).forEach(cities => {
        filteredCities.push(...cities);
      });
    } else {
      filteredCities = citiesData[selectedState] || [];
    }

    // Filtruj według wyszukiwania
    if (searchTerm) {
      filteredCities = filteredCities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.district.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sortuj
    filteredCities.sort((a, b) => {
      if (sortBy === 'population') {
        return b.population - a.population;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return filteredCities;
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

  const getPopulationCategory = (population: number) => {
    if (population >= 1000000) return 'Millionenstadt';
    if (population >= 100000) return 'Großstadt';
    if (population >= 50000) return 'Mittelstadt';
    return 'Kleinstadt';
  };

  const getPopulationColor = (population: number) => {
    if (population >= 1000000) return 'bg-red-500';
    if (population >= 100000) return 'bg-orange-500';
    if (population >= 50000) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-moving-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-moving-blue mx-auto mb-4"></div>
          <p className="text-moving-dark">Ładowanie danych miast...</p>
        </div>
      </div>
    );
  }

  const filteredCities = getFilteredCities();

  return (
    <div className="min-h-screen bg-moving-gray">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-moving-dark mb-4">
            Miasta Niemiec
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Przeglądaj wszystkie miasta i gminy w Niemczech z populacją powyżej 20,000 mieszkańców. 
            Dane obejmują 16 landów niemieckich.
          </p>
        </div>

        {/* Filtry */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Wyszukiwanie */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Szukaj miasta lub powiatu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Wybór landu */}
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz land" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie landy</SelectItem>
                {Object.keys(citiesData).map(state => (
                  <SelectItem key={state} value={state}>
                    {getStateName(state)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sortowanie */}
            <Select value={sortBy} onValueChange={(value: 'population' | 'name') => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sortuj według" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="population">Według populacji</SelectItem>
                <SelectItem value="name">Według nazwy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Statystyki */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-moving-blue mr-3" />
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
                <MapPin className="w-8 h-8 text-moving-blue mr-3" />
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
                <div className="w-8 h-8 bg-red-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-gray-600">Milionowe miasta</p>
                  <p className="text-2xl font-bold text-moving-dark">
                    {filteredCities.filter(city => city.population >= 1000000).length}
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
                  <p className="text-sm text-gray-600">Wyników</p>
                  <p className="text-2xl font-bold text-moving-dark">
                    {filteredCities.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista miast */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city, index) => (
            <Card key={`${city.slug}-${index}`} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-moving-dark">
                    {city.name}
                  </CardTitle>
                  <Badge 
                    variant="secondary" 
                    className={`${getPopulationColor(city.population)} text-white`}
                  >
                    {getPopulationCategory(city.population)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{city.district}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Populacja:</span>
                    <span className="font-semibold text-moving-dark">
                      {formatPopulation(city.population)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Powierzchnia:</span>
                    <span className="font-semibold text-moving-dark">
                      {formatArea(city.area)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Land:</span>
                    <span className="font-semibold text-moving-blue">
                      {getStateName(Object.keys(citiesData).find(state => 
                        citiesData[state].some(c => c.name === city.name)
                      ) || '')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nie znaleziono miast
            </h3>
            <p className="text-gray-500">
              Spróbuj zmienić kryteria wyszukiwania lub wybrać inny land.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitiesPage; 
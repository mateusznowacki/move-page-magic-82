import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MapPin, Users, Search, ArrowLeft } from 'lucide-react';

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

const StateCitiesPage: React.FC = () => {
  const { t } = useLanguage();
  const { stateSlug } = useParams<{ stateSlug: string }>();
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'population' | 'name'>('population');

  useEffect(() => {
    const loadCities = async () => {
      if (!stateSlug) return;
      
      try {
        const response = await fetch(`/data/cities/${stateSlug}.json`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Błąd podczas ładowania danych miast:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, [stateSlug]);

  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat('de-DE').format(population);
  };

  const formatArea = (area: number) => {
    return `${area.toFixed(1)} km²`;
  };

  const getStateName = (stateSlug: string) => {
    const stateMapping: { [key: string]: string } = {
      'nordrhein-westfalen': 'Nordrhein-Westfalen',
      'baden-wuerttemberg': 'Baden-Württemberg',
      'bayern': 'Bayern',
      'niedersachsen': 'Niedersachsen',
      'rheinland-pfalz': 'Rheinland-Pfalz',
      'sachsen': 'Sachsen',
      'schleswig-holstein': 'Schleswig-Holstein',
      'sachsen-anhalt': 'Sachsen-Anhalt',
      'hessen': 'Hessen',
      'thueringen': 'Thüringen',
      'mecklenburg-vorpommern': 'Mecklenburg-Vorpommern',
      'brandenburg': 'Brandenburg',
      'berlin': 'Berlin',
      'saarland': 'Saarland',
      'bremen': 'Bremen',
      'hamburg': 'Hamburg'
    };
    return stateMapping[stateSlug] || stateSlug;
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

  const getFilteredCities = () => {
    let filteredCities = [...cities];

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

  const getStateStats = () => {
    const totalPopulation = cities.reduce((sum, city) => sum + city.population, 0);
    const millionCities = cities.filter(city => city.population >= 1000000).length;
    const largeCities = cities.filter(city => city.population >= 100000).length;
    const mediumCities = cities.filter(city => city.population >= 50000 && city.population < 100000).length;
    
    return {
      totalPopulation,
      millionCities,
      largeCities,
      mediumCities,
      totalCities: cities.length
    };
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

  if (!stateSlug) {
    return (
      <div className="min-h-screen bg-moving-gray flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-moving-dark mb-4">Nie znaleziono landu</h1>
          <Link to="/staedte" className="text-moving-blue hover:underline">
            Wróć do listy landów
          </Link>
        </div>
      </div>
    );
  }

  const filteredCities = getFilteredCities();
  const stats = getStateStats();
  const stateName = getStateName(stateSlug);

  return (
    <div className="min-h-screen bg-moving-gray">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/staedte" 
            className="inline-flex items-center text-moving-blue hover:text-moving-darkblue mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Wróć do listy landów
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-moving-dark mb-4">
              Miasta w {stateName}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lista wszystkich miast i gmin w {stateName} z populacją powyżej 20,000 mieszkańców.
            </p>
          </div>
        </div>

        {/* Statystyki landu */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <MapPin className="w-8 h-8 text-moving-blue mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Miast</p>
                  <p className="text-2xl font-bold text-moving-dark">
                    {stats.totalCities}
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
                  <p className="text-sm text-gray-600">Populacja</p>
                  <p className="text-2xl font-bold text-moving-dark">
                    {formatPopulation(stats.totalPopulation)}
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
                  <p className="text-sm text-gray-600">Milionowe</p>
                  <p className="text-2xl font-bold text-moving-dark">
                    {stats.millionCities}
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
                  <p className="text-sm text-gray-600">Duże</p>
                  <p className="text-2xl font-bold text-moving-dark">
                    {stats.largeCities}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-gray-600">Średnie</p>
                  <p className="text-2xl font-bold text-moving-dark">
                    {stats.mediumCities}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtry */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Lista miast */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city, index) => (
            <Link key={`${city.slug}-${index}`} to={`/staedte/${stateSlug}/${city.slug}`}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
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
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        Kliknij, aby zobaczyć szczegóły
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nie znaleziono miast
            </h3>
            <p className="text-gray-500">
              Spróbuj zmienić kryteria wyszukiwania.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateCitiesPage; 
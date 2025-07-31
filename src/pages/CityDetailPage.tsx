import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { MapPin, Users, Navigation, ArrowLeft, Building, Globe } from 'lucide-react';

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

const CityDetailPage: React.FC = () => {
  const { t } = useLanguage();
  const { stateSlug, citySlug } = useParams<{ stateSlug: string; citySlug: string }>();
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCity = async () => {
      if (!stateSlug || !citySlug) return;
      
      try {
        const response = await fetch(`/data/cities/${stateSlug}.json`);
        const cities = await response.json();
        const foundCity = cities.find((c: City) => c.slug === citySlug);
        setCity(foundCity || null);
      } catch (error) {
        console.error('Błąd podczas ładowania danych miasta:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCity();
  }, [stateSlug, citySlug]);

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

  const openInMaps = () => {
    if (city) {
      const url = `https://www.google.com/maps?q=${city.coords.lat},${city.coords.lon}`;
      window.open(url, '_blank');
    }
  };

  const getPopulationDensity = () => {
    if (!city) return 0;
    return Math.round(city.population / city.area);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-moving-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-moving-blue mx-auto mb-4"></div>
          <p className="text-moving-dark">Ładowanie danych miasta...</p>
        </div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="min-h-screen bg-moving-gray flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-moving-dark mb-4">Nie znaleziono miasta</h1>
          <Link to={`/staedte/${stateSlug}`} className="text-moving-blue hover:underline">
            Wróć do listy miast
          </Link>
        </div>
      </div>
    );
  }

  const stateName = getStateName(stateSlug!);
  const populationDensity = getPopulationDensity();

  return (
    <div className="min-h-screen bg-moving-gray">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to={`/staedte/${stateSlug}`} 
            className="inline-flex items-center text-moving-blue hover:text-moving-darkblue mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Wróć do listy miast w {stateName}
          </Link>
          
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Badge 
                variant="secondary" 
                className={`${getPopulationColor(city.population)} text-white text-lg px-4 py-2`}
              >
                {getPopulationCategory(city.population)}
              </Badge>
            </div>
            <h1 className="text-5xl font-bold text-moving-dark mb-4">
              {city.name}
            </h1>
            <p className="text-xl text-gray-600">
              {stateName} • {city.district}
            </p>
          </div>
        </div>

        {/* Główne informacje */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Karta z podstawowymi danymi */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Podstawowe informacje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="w-6 h-6 text-moving-blue mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Populacja</p>
                      <p className="text-2xl font-bold text-moving-dark">
                        {formatPopulation(city.population)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Building className="w-6 h-6 text-moving-blue mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Powierzchnia</p>
                      <p className="text-2xl font-bold text-moving-dark">
                        {formatArea(city.area)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Globe className="w-6 h-6 text-moving-blue mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Gęstość zaludnienia</p>
                      <p className="text-2xl font-bold text-moving-dark">
                        {formatPopulation(populationDensity)} os./km²
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-moving-blue mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Powiat</p>
                      <p className="text-2xl font-bold text-moving-dark">
                        {city.district}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Karta z lokalizacją */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Lokalizacja</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Współrzędne geograficzne</p>
                  <p className="font-mono text-sm">
                    {city.coords.lat}°N, {city.coords.lon}°E
                  </p>
                </div>
                
                <Button 
                  onClick={openInMaps}
                  className="w-full bg-moving-blue hover:bg-moving-darkblue"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Otwórz w Google Maps
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dodatkowe informacje */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Statystyki miasta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kategoria miasta:</span>
                  <Badge className={getPopulationColor(city.population)}>
                    {getPopulationCategory(city.population)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Land:</span>
                  <span className="font-semibold">{stateName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Powiat:</span>
                  <span className="font-semibold">{city.district}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gęstość zaludnienia:</span>
                  <span className="font-semibold">{formatPopulation(populationDensity)} os./km²</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Porównanie z innymi miastami</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Wielkość w Niemczech:</span>
                  <span className="font-semibold">
                    {city.population >= 1000000 ? 'Milionowe miasto' :
                     city.population >= 100000 ? 'Duże miasto' :
                     city.population >= 50000 ? 'Średnie miasto' : 'Małe miasto'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Typ administracyjny:</span>
                  <span className="font-semibold">
                    {city.district.includes('Urban') ? 'Miasto na prawach powiatu' : 'Miasto powiatowe'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Powierzchnia:</span>
                  <span className="font-semibold">
                    {city.area > 200 ? 'Duża powierzchnia' :
                     city.area > 100 ? 'Średnia powierzchnia' : 'Mała powierzchnia'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Przyciski nawigacji */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={`/staedte/${stateSlug}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Wróć do listy miast w {stateName}
            </Button>
          </Link>
          <Link to="/staedte">
            <Button variant="outline" className="w-full sm:w-auto">
              <Building className="w-4 h-4 mr-2" />
              Wszystkie landy
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CityDetailPage; 
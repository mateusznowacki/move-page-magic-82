import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { MapPin, Phone, Mail, Clock, Truck, Package, Home, Building, ChevronLeft, Star, Users, Shield, Award } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface CityData {
  name: string;
  slug: string;
}

const CityDetailPage: React.FC = () => {
  const { stateSlug, citySlug } = useParams<{ stateSlug: string; citySlug: string }>();
  const { t, language } = useLanguage();
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [stateName, setStateName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCityData = async () => {
      if (!stateSlug || !citySlug) return;
      
      try {
        // Pobierz dane miasta z pliku JSON
        const response = await fetch(`/data/cities/${stateSlug}.json`);
        const cities: CityData[] = await response.json();
        const city = cities.find(c => c.slug === citySlug);
        
        if (city) {
          setCityData(city);
          setStateName(getStateDisplayName(stateSlug));
        }
      } catch (error) {
        console.error('Błąd podczas ładowania danych miasta:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCityData();
  }, [stateSlug, citySlug]);

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

  const getHeaderText = () => {
    const cityName = cityData?.name || '';
    const texts = {
      en: {
        title: `Moving Services in ${cityName}`,
        subtitle: `Professional moving services in ${cityName}, ${stateName}. Residential and commercial moves, packing, furniture assembly, and storage solutions. Get your free quote today!`,
        backToState: `Back to ${stateName}`,
        backToStates: 'Back to States',
        heroTitle: `Professional Moving Services in ${cityName}`,
        heroSubtitle: `Reliable and efficient moving services in ${cityName}. We handle residential moves, commercial relocations, packing, and furniture assembly with care and professionalism.`,
        getQuote: 'Get Free Quote',
        contactUs: 'Contact Us'
      },
      pl: {
        title: `Usługi przeprowadzkowe w ${cityName}`,
        subtitle: `Profesjonalne usługi przeprowadzkowe w ${cityName}, ${stateName}. Przeprowadzki mieszkaniowe i komercyjne, pakowanie, montaż mebli i rozwiązania magazynowe. Uzyskaj darmową wycenę już dziś!`,
        backToState: `Powrót do ${stateName}`,
        backToStates: 'Powrót do krajów',
        heroTitle: `Profesjonalne usługi przeprowadzkowe w ${cityName}`,
        heroSubtitle: `Niezawodne i efektywne usługi przeprowadzkowe w ${cityName}. Zajmujemy się przeprowadzkami mieszkaniowymi, relokacjami komercyjnymi, pakowaniem i montażem mebli z dbałością i profesjonalizmem.`,
        getQuote: 'Uzyskaj darmową wycenę',
        contactUs: 'Skontaktuj się z nami'
      },
      de: {
        title: `Umzugsdienste in ${cityName}`,
        subtitle: `Professionelle Umzugsdienste in ${cityName}, ${stateName}. Wohnungs- und Geschäftsumzüge, Verpackung, Möbelmontage und Lagerungslösungen. Jetzt kostenloses Angebot!`,
        backToState: `Zurück zu ${stateName}`,
        backToStates: 'Zurück zu Bundesländern',
        heroTitle: `Professionelle Umzugsdienste in ${cityName}`,
        heroSubtitle: `Zuverlässige und effiziente Umzugsdienste in ${cityName}. Wir kümmern uns um Wohnungsumzüge, Geschäftsrelokationen, Verpackung und Möbelmontage mit Sorgfalt und Professionalität.`,
        getQuote: 'Kostenloses Angebot erhalten',
        contactUs: 'Kontaktieren Sie uns'
      },
      es: {
        title: `Servicios de mudanza en ${cityName}`,
        subtitle: `Servicios profesionales de mudanza en ${cityName}, ${stateName}. Mudanzas residenciales y comerciales, embalaje, montaje de muebles, almacenamiento. ¡Obtenga su presupuesto gratuito hoy!`,
        backToState: `Volver a ${stateName}`,
        backToStates: 'Volver a Estados',
        heroTitle: `Servicios profesionales de mudanza en ${cityName}`,
        heroSubtitle: `Servicios de mudanza confiables y eficientes en ${cityName}. Manejamos mudanzas residenciales, reubicaciones comerciales, embalaje y montaje de muebles con cuidado y profesionalismo.`,
        getQuote: 'Obtener presupuesto gratis',
        contactUs: 'Contáctenos'
      }
    };
    return texts[language as keyof typeof texts] || texts.en;
  };

  const getSEOData = () => {
    const cityName = cityData?.name || '';
    const seoData = {
      en: {
        title: `Moving Services in ${cityName} - Professional Relocation | Meister Umzüge 24`,
        description: `Professional moving services in ${cityName}, ${stateName}. Residential and commercial moves, packing, furniture assembly, storage. Free quote! Call +49 152 230 314 73`,
        keywords: `moving services ${cityName}, relocation ${cityName}, residential moving ${cityName}, commercial moving ${cityName}, packing services ${cityName}, furniture assembly ${cityName}, Umzug ${cityName}, ${stateName} moving company`
      },
      pl: {
        title: `Usługi przeprowadzkowe w ${cityName} - Profesjonalne przeprowadzki | Meister Umzüge 24`,
        description: `Profesjonalne usługi przeprowadzkowe w ${cityName}, ${stateName}. Przeprowadzki mieszkaniowe i komercyjne, pakowanie, montaż mebli, magazynowanie. Darmowa wycena! Zadzwoń +49 152 230 314 73`,
        keywords: `usługi przeprowadzkowe ${cityName}, przeprowadzki ${cityName}, przeprowadzki mieszkaniowe ${cityName}, przeprowadzki komercyjne ${cityName}, pakowanie ${cityName}, montaż mebli ${cityName}, Umzug ${cityName}, firma przeprowadzkowa ${stateName}`
      },
      de: {
        title: `Umzugsdienste in ${cityName} - Professionelle Umzüge | Meister Umzüge 24`,
        description: `Professionelle Umzugsdienste in ${cityName}, ${stateName}. Wohnungs- und Geschäftsumzüge, Verpackung, Möbelmontage, Lagerung. Kostenloses Angebot! Anruf +49 152 230 314 73`,
        keywords: `Umzugsdienste ${cityName}, Umzug ${cityName}, Wohnungsumzug ${cityName}, Geschäftsumzug ${cityName}, Verpackung ${cityName}, Möbelmontage ${cityName}, Umzugsfirma ${stateName}`
      },
      es: {
        title: `Servicios de mudanza en ${cityName} - Mudanzas profesionales | Meister Umzüge 24`,
        description: `Servicios profesionales de mudanza en ${cityName}, ${stateName}. Mudanzas residenciales y comerciales, embalaje, montaje de muebles, almacenamiento. ¡Presupuesto gratuito! Llame +49 152 230 314 73`,
        keywords: `servicios de mudanza ${cityName}, mudanzas ${cityName}, mudanzas residenciales ${cityName}, mudanzas comerciales ${cityName}, embalaje ${cityName}, montaje de muebles ${cityName}, empresa de mudanzas ${stateName}`
      }
    };
    return seoData[language as keyof typeof seoData] || seoData.en;
  };

  const getServices = () => {
    const cityName = cityData?.name || '';
    const services = {
      en: [
        {
          icon: Home,
          title: 'Residential Moving',
          description: `Complete moving services for homes and apartments in ${cityName}. We handle everything from packing to furniture assembly.`
        },
        {
          icon: Building,
          title: 'Commercial Moving',
          description: `Professional office and business relocation services in ${cityName}. Minimal downtime, maximum efficiency.`
        },
        {
          icon: Package,
          title: 'Packing & Unpacking',
          description: `Expert packing and unpacking services in ${cityName}. We protect your valuable belongings with care.`
        },
        {
          icon: Truck,
          title: 'Long Distance Moving',
          description: `Reliable long-distance moving services from ${cityName} to any destination in Germany and EU.`
        }
      ],
      pl: [
        {
          icon: Home,
          title: 'Przeprowadzki mieszkaniowe',
          description: `Kompletne usługi przeprowadzkowe dla domów i mieszkań w ${cityName}. Zajmujemy się wszystkim od pakowania po montaż mebli.`
        },
        {
          icon: Building,
          title: 'Przeprowadzki komercyjne',
          description: `Profesjonalne usługi relokacji biur i firm w ${cityName}. Minimalne przestoje, maksymalna efektywność.`
        },
        {
          icon: Package,
          title: 'Pakowanie i rozpakowywanie',
          description: `Eksperckie usługi pakowania i rozpakowywania w ${cityName}. Chronimy Twoje cenne rzeczy z dbałością.`
        },
        {
          icon: Truck,
          title: 'Przeprowadzki na duże odległości',
          description: `Niezawodne usługi przeprowadzkowe na duże odległości z ${cityName} do dowolnego miejsca w Niemczech i UE.`
        }
      ],
      de: [
        {
          icon: Home,
          title: 'Wohnungsumzug',
          description: `Vollständige Umzugsdienste für Häuser und Wohnungen in ${cityName}. Wir kümmern uns um alles von der Verpackung bis zur Möbelmontage.`
        },
        {
          icon: Building,
          title: 'Geschäftsumzug',
          description: `Professionelle Büro- und Geschäftsumzugsdienste in ${cityName}. Minimale Ausfallzeiten, maximale Effizienz.`
        },
        {
          icon: Package,
          title: 'Verpackung & Auspackung',
          description: `Experten-Verpackungs- und Auspackungsdienste in ${cityName}. Wir schützen Ihre wertvollen Gegenstände mit Sorgfalt.`
        },
        {
          icon: Truck,
          title: 'Fernumzug',
          description: `Zuverlässige Fernumzugsdienste von ${cityName} zu jedem Ziel in Deutschland und der EU.`
        }
      ],
      es: [
        {
          icon: Home,
          title: 'Mudanzas residenciales',
          description: `Servicios completos de mudanza para hogares y apartamentos en ${cityName}. Manejamos todo desde el embalaje hasta el montaje de muebles.`
        },
        {
          icon: Building,
          title: 'Mudanzas comerciales',
          description: `Servicios profesionales de reubicación de oficinas y negocios en ${cityName}. Tiempo de inactividad mínimo, eficiencia máxima.`
        },
        {
          icon: Package,
          title: 'Embalaje y desempaquetado',
          description: `Servicios expertos de embalaje y desempaquetado en ${cityName}. Protegemos sus pertenencias valiosas con cuidado.`
        },
        {
          icon: Truck,
          title: 'Mudanzas de larga distancia',
          description: `Servicios confiables de mudanza de larga distancia desde ${cityName} a cualquier destino en Alemania y la UE.`
        }
      ]
    };
    return services[language as keyof typeof services] || services.en;
  };

  const getWhyChooseUs = () => {
    const cityName = cityData?.name || '';
    const reasons = {
      en: [
        {
          icon: Star,
          title: '10+ Years Experience',
          description: `Over 10 years of professional moving experience in ${cityName} and surrounding areas.`
        },
        {
          icon: Users,
          title: '5000+ Happy Customers',
          description: `More than 5000 satisfied customers who trusted us with their moves in ${cityName}.`
        },
        {
          icon: Shield,
          title: 'Fully Insured',
          description: `Complete insurance coverage for all your belongings during the move in ${cityName}.`
        },
        {
          icon: Award,
          title: 'Professional Team',
          description: `Experienced and trained professionals dedicated to making your move in ${cityName} stress-free.`
        }
      ],
      pl: [
        {
          icon: Star,
          title: '10+ Lat Doświadczenia',
          description: `Ponad 10 lat profesjonalnego doświadczenia w przeprowadzkach w ${cityName} i okolicach.`
        },
        {
          icon: Users,
          title: '5000+ Zadowolonych Klientów',
          description: `Ponad 5000 zadowolonych klientów, którzy zaufali nam w przeprowadzkach w ${cityName}.`
        },
        {
          icon: Shield,
          title: 'W pełni ubezpieczeni',
          description: `Pełne ubezpieczenie wszystkich Twoich rzeczy podczas przeprowadzki w ${cityName}.`
        },
        {
          icon: Award,
          title: 'Profesjonalny zespół',
          description: `Doświadczeni i przeszkoleni profesjonaliści, którzy dbają o to, aby Twoja przeprowadzka w ${cityName} była bezstresowa.`
        }
      ],
      de: [
        {
          icon: Star,
          title: '10+ Jahre Erfahrung',
          description: `Über 10 Jahre professionelle Umzugserfahrung in ${cityName} und Umgebung.`
        },
        {
          icon: Users,
          title: '5000+ Zufriedene Kunden',
          description: `Mehr als 5000 zufriedene Kunden, die uns mit ihren Umzügen in ${cityName} vertraut haben.`
        },
        {
          icon: Shield,
          title: 'Vollständig versichert',
          description: `Vollständige Versicherungsabdeckung für alle Ihre Sachen während des Umzugs in ${cityName}.`
        },
        {
          icon: Award,
          title: 'Professionelles Team',
          description: `Erfahrene und geschulte Fachleute, die sich dafür einsetzen, Ihren Umzug in ${cityName} stressfrei zu gestalten.`
        }
      ],
      es: [
        {
          icon: Star,
          title: '10+ Años de Experiencia',
          description: `Más de 10 años de experiencia profesional en mudanzas en ${cityName} y áreas circundantes.`
        },
        {
          icon: Users,
          title: '5000+ Clientes Satisfechos',
          description: `Más de 5000 clientes satisfechos que confiaron en nosotros para sus mudanzas en ${cityName}.`
        },
        {
          icon: Shield,
          title: 'Completamente asegurado',
          description: `Cobertura de seguro completa para todas sus pertenencias durante la mudanza en ${cityName}.`
        },
        {
          icon: Award,
          title: 'Equipo profesional',
          description: `Profesionales experimentados y capacitados dedicados a hacer que su mudanza en ${cityName} sea libre de estrés.`
        }
      ]
    };
    return reasons[language as keyof typeof reasons] || reasons.en;
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
            <p className="text-moving-dark">Ładowanie danych miasta...</p>
          </div>
        </div>
      </>
    );
  }

  if (!cityData) {
    return (
      <div className="min-h-screen bg-moving-gray flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-moving-dark mb-4">Miasto nie zostało znalezione</h1>
          <Link to="/staedte" className="text-moving-blue hover:underline">
            Powrót do listy landów
          </Link>
        </div>
      </div>
    );
  }

  const headerText = getHeaderText();
  const seoData = getSEOData();
  const services = getServices();
  const whyChooseUs = getWhyChooseUs();

  return (
    <>
      <SEOHead 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      <div className="min-h-screen bg-moving-gray">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link to="/staedte" className="hover:text-moving-blue transition-colors">
                {headerText.backToStates}
              </Link>
              <span>/</span>
              <Link to={`/staedte/${stateSlug}`} className="hover:text-moving-blue transition-colors">
                {headerText.backToState}
              </Link>
              <span>/</span>
              <span className="text-moving-dark font-medium">{cityData.name}</span>
            </div>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-moving-dark mb-6">
              {headerText.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {headerText.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-moving-blue hover:bg-moving-darkblue">
                {headerText.getQuote}
              </Button>
              <Button size="lg" variant="outline">
                {headerText.contactUs}
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Phone className="w-8 h-8 text-moving-blue mr-4" />
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <a href="tel:+4915223031473" className="text-moving-blue hover:underline">
                      +49 152 230 314 73
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Mail className="w-8 h-8 text-moving-blue mr-4" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <a href="mailto:info@meisterumzuege24.de" className="text-moving-blue hover:underline">
                      info@meisterumzuege24.de
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-moving-blue mr-4" />
                  <div>
                    <h3 className="font-semibold text-lg">Working Hours</h3>
                    <p className="text-sm">Mon-Fri: 8:00-18:00</p>
                    <p className="text-sm">Sat: 9:00-16:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-moving-dark text-center mb-8">
              Our Services in {cityData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <service.icon className="w-12 h-12 text-moving-blue mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-moving-dark text-center mb-8">
              Why Choose Us in {cityData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((reason, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <reason.icon className="w-12 h-12 text-moving-blue mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                    <p className="text-gray-600 text-sm">{reason.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-moving-blue text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Move in {cityData.name}?
            </h2>
            <p className="text-lg mb-6">
              Get your free quote today and experience professional moving services!
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-moving-blue hover:bg-gray-100">
              Get Free Quote
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CityDetailPage; 
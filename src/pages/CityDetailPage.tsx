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
        
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status} for ${stateSlug}`);
          return;
        }
        
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

  const getCityDisplayName = (cityName: string, lang: string) => {
    // Specjalne przypadki dla miast z polskimi nazwami
    const cityTranslations: { [key: string]: { [key: string]: string } } = {
      'Berlin': {
        pl: 'Berlin',
        de: 'Berlin',
        en: 'Berlin',
        es: 'Berlín'
      },
      'Dresden': {
        pl: 'Drezno',
        de: 'Dresden',
        en: 'Dresden',
        es: 'Dresde'
      },
      'Leipzig': {
        pl: 'Lipsk',
        de: 'Leipzig',
        en: 'Leipzig',
        es: 'Leipzig'
      },
      'Chemnitz': {
        pl: 'Chemnitz',
        de: 'Chemnitz',
        en: 'Chemnitz',
        es: 'Chemnitz'
      },
      'Halle': {
        pl: 'Halle',
        de: 'Halle (Saale)',
        en: 'Halle',
        es: 'Halle'
      },
      'Magdeburg': {
        pl: 'Magdeburg',
        de: 'Magdeburg',
        en: 'Magdeburg',
        es: 'Magdeburgo'
      },
      'Erfurt': {
        pl: 'Erfurt',
        de: 'Erfurt',
        en: 'Erfurt',
        es: 'Erfurt'
      },
      'Jena': {
        pl: 'Jena',
        de: 'Jena',
        en: 'Jena',
        es: 'Jena'
      },
      'Gera': {
        pl: 'Gera',
        de: 'Gera',
        en: 'Gera',
        es: 'Gera'
      },
      'Weimar': {
        pl: 'Weimar',
        de: 'Weimar',
        en: 'Weimar',
        es: 'Weimar'
      },
      'Potsdam': {
        pl: 'Poczdam',
        de: 'Potsdam',
        en: 'Potsdam',
        es: 'Potsdam'
      },
      'Rostock': {
        pl: 'Rostock',
        de: 'Rostock',
        en: 'Rostock',
        es: 'Rostock'
      },
      'Schwerin': {
        pl: 'Schwerin',
        de: 'Schwerin',
        en: 'Schwerin',
        es: 'Schwerin'
      }
    };

    // Sprawdź czy istnieje tłumaczenie dla tego miasta
    if (cityTranslations[cityName] && cityTranslations[cityName][lang]) {
      return cityTranslations[cityName][lang];
    }

    // Dla pozostałych miast zwróć oryginalną nazwę
    return cityName;
  };

  const getHeaderText = () => {
    const cityName = cityData?.name || '';
    const translatedCityName = getCityDisplayName(cityName, language);
    const texts = {
      en: {
        title: `Moving Services in ${translatedCityName}`,
        subtitle: `Professional moving services in ${translatedCityName}, ${stateName}. Residential and commercial moves, packing, furniture assembly, and storage solutions. Get your free quote today!`,
        backToState: `Back to ${stateName}`,
        backToStates: 'Back to States',
        heroTitle: `Professional Moving Services in ${translatedCityName}`,
        heroSubtitle: `Reliable and efficient moving services in ${translatedCityName}. We handle residential moves, commercial relocations, packing, and furniture assembly with care and professionalism.`,
        getQuote: 'Get Free Quote',
        contactUs: 'Contact Us'
      },
      pl: {
        title: `Usługi przeprowadzkowe w ${translatedCityName}`,
        subtitle: `Profesjonalne usługi przeprowadzkowe w ${translatedCityName}, ${stateName}. Przeprowadzki mieszkaniowe i komercyjne, pakowanie, montaż mebli i rozwiązania magazynowe. Uzyskaj darmową wycenę już dziś!`,
        backToState: `Powrót do ${stateName}`,
        backToStates: 'Powrót do krajów',
        heroTitle: `Profesjonalne usługi przeprowadzkowe w ${translatedCityName}`,
        heroSubtitle: `Niezawodne i efektywne usługi przeprowadzkowe w ${translatedCityName}. Zajmujemy się przeprowadzkami mieszkaniowymi, relokacjami komercyjnymi, pakowaniem i montażem mebli z dbałością i profesjonalizmem.`,
        getQuote: 'Uzyskaj darmową wycenę',
        contactUs: 'Skontaktuj się z nami'
      },
      de: {
        title: `Umzugsdienste in ${translatedCityName}`,
        subtitle: `Professionelle Umzugsdienste in ${translatedCityName}, ${stateName}. Wohnungs- und Geschäftsumzüge, Verpackung, Möbelmontage und Lagerungslösungen. Jetzt kostenloses Angebot!`,
        backToState: `Zurück zu ${stateName}`,
        backToStates: 'Zurück zu Bundesländern',
        heroTitle: `Professionelle Umzugsdienste in ${translatedCityName}`,
        heroSubtitle: `Zuverlässige und effiziente Umzugsdienste in ${translatedCityName}. Wir kümmern uns um Wohnungsumzüge, Geschäftsrelokationen, Verpackung und Möbelmontage mit Sorgfalt und Professionalität.`,
        getQuote: 'Kostenloses Angebot erhalten',
        contactUs: 'Kontaktieren Sie uns'
      },
      es: {
        title: `Servicios de mudanza en ${translatedCityName}`,
        subtitle: `Servicios profesionales de mudanza en ${translatedCityName}, ${stateName}. Mudanzas residenciales y comerciales, embalaje, montaje de muebles, almacenamiento. ¡Obtenga su presupuesto gratuito hoy!`,
        backToState: `Volver a ${stateName}`,
        backToStates: 'Volver a Estados',
        heroTitle: `Servicios profesionales de mudanza en ${translatedCityName}`,
        heroSubtitle: `Servicios de mudanza confiables y eficientes en ${translatedCityName}. Manejamos mudanzas residenciales, reubicaciones comerciales, embalaje y montaje de muebles con cuidado y profesionalismo.`,
        getQuote: 'Obtener presupuesto gratis',
        contactUs: 'Contáctenos'
      }
    };
    return texts[language as keyof typeof texts] || texts.en;
  };

  const getSEOData = () => {
    const cityName = cityData?.name || '';
    const translatedCityName = getCityDisplayName(cityName, language);
    const seoData = {
      en: {
        title: `Moving Services in ${translatedCityName} - Professional Relocation | Meister Umzüge 24`,
        description: `Professional moving services in ${translatedCityName}, ${stateName}. Residential and commercial moves, packing, furniture assembly, storage. Free quote! Call +49 152 230 314 73`,
        keywords: `moving services ${translatedCityName}, relocation ${translatedCityName}, residential moving ${translatedCityName}, commercial moving ${translatedCityName}, packing services ${translatedCityName}, furniture assembly ${translatedCityName}, Umzug ${translatedCityName}, ${stateName} moving company`
      },
      pl: {
        title: `Usługi przeprowadzkowe w ${translatedCityName} - Profesjonalne przeprowadzki | Meister Umzüge 24`,
        description: `Profesjonalne usługi przeprowadzkowe w ${translatedCityName}, ${stateName}. Przeprowadzki mieszkaniowe i komercyjne, pakowanie, montaż mebli, magazynowanie. Darmowa wycena! Zadzwoń +49 152 230 314 73`,
        keywords: `usługi przeprowadzkowe ${translatedCityName}, przeprowadzki ${translatedCityName}, przeprowadzki mieszkaniowe ${translatedCityName}, przeprowadzki komercyjne ${translatedCityName}, pakowanie ${translatedCityName}, montaż mebli ${translatedCityName}, Umzug ${translatedCityName}, firma przeprowadzkowa ${stateName}`
      },
      de: {
        title: `Umzugsdienste in ${translatedCityName} - Professionelle Umzüge | Meister Umzüge 24`,
        description: `Professionelle Umzugsdienste in ${translatedCityName}, ${stateName}. Wohnungs- und Geschäftsumzüge, Verpackung, Möbelmontage, Lagerung. Kostenloses Angebot! Anruf +49 152 230 314 73`,
        keywords: `Umzugsdienste ${translatedCityName}, Umzug ${translatedCityName}, Wohnungsumzug ${translatedCityName}, Geschäftsumzug ${translatedCityName}, Verpackung ${translatedCityName}, Möbelmontage ${translatedCityName}, Umzugsfirma ${stateName}`
      },
      es: {
        title: `Servicios de mudanza en ${translatedCityName} - Mudanzas profesionales | Meister Umzüge 24`,
        description: `Servicios profesionales de mudanza en ${translatedCityName}, ${stateName}. Mudanzas residenciales y comerciales, embalaje, montaje de muebles, almacenamiento. ¡Presupuesto gratuito! Llame +49 152 230 314 73`,
        keywords: `servicios de mudanza ${translatedCityName}, mudanzas ${translatedCityName}, mudanzas residenciales ${translatedCityName}, mudanzas comerciales ${translatedCityName}, embalaje ${translatedCityName}, montaje de muebles ${translatedCityName}, empresa de mudanzas ${stateName}`
      }
    };
    return seoData[language as keyof typeof seoData] || seoData.en;
  };

  const getServices = () => {
    const cityName = cityData?.name || '';
    const translatedCityName = getCityDisplayName(cityName, language);
    const services = {
      en: [
        {
          icon: Home,
          title: 'Residential Moving',
          description: `Complete moving services for homes and apartments in ${translatedCityName}. We handle everything from packing to furniture assembly.`
        },
        {
          icon: Building,
          title: 'Commercial Moving',
          description: `Professional office and business relocation services in ${translatedCityName}. Minimal downtime, maximum efficiency.`
        },
        {
          icon: Package,
          title: 'Packing & Unpacking',
          description: `Expert packing and unpacking services in ${translatedCityName}. We protect your valuable belongings with care.`
        },
        {
          icon: Truck,
          title: 'Long Distance Moving',
          description: `Reliable long-distance moving services from ${translatedCityName} to any destination in Germany and EU.`
        }
      ],
      pl: [
        {
          icon: Home,
          title: 'Przeprowadzki mieszkaniowe',
          description: `Kompletne usługi przeprowadzkowe dla domów i mieszkań w ${translatedCityName}. Zajmujemy się wszystkim od pakowania po montaż mebli.`
        },
        {
          icon: Building,
          title: 'Przeprowadzki komercyjne',
          description: `Profesjonalne usługi relokacji biur i firm w ${translatedCityName}. Minimalne przestoje, maksymalna efektywność.`
        },
        {
          icon: Package,
          title: 'Pakowanie i rozpakowywanie',
          description: `Eksperckie usługi pakowania i rozpakowywania w ${translatedCityName}. Chronimy Twoje cenne rzeczy z dbałością.`
        },
        {
          icon: Truck,
          title: 'Przeprowadzki na duże odległości',
          description: `Niezawodne usługi przeprowadzkowe na duże odległości z ${translatedCityName} do dowolnego miejsca w Niemczech i UE.`
        }
      ],
      de: [
        {
          icon: Home,
          title: 'Wohnungsumzug',
          description: `Vollständige Umzugsdienste für Häuser und Wohnungen in ${translatedCityName}. Wir kümmern uns um alles von der Verpackung bis zur Möbelmontage.`
        },
        {
          icon: Building,
          title: 'Geschäftsumzug',
          description: `Professionelle Büro- und Geschäftsumzugsdienste in ${translatedCityName}. Minimale Ausfallzeiten, maximale Effizienz.`
        },
        {
          icon: Package,
          title: 'Verpackung & Auspackung',
          description: `Experten-Verpackungs- und Auspackungsdienste in ${translatedCityName}. Wir schützen Ihre wertvollen Gegenstände mit Sorgfalt.`
        },
        {
          icon: Truck,
          title: 'Fernumzug',
          description: `Zuverlässige Fernumzugsdienste von ${translatedCityName} zu jedem Ziel in Deutschland und der EU.`
        }
      ],
      es: [
        {
          icon: Home,
          title: 'Mudanzas residenciales',
          description: `Servicios completos de mudanza para hogares y apartamentos en ${translatedCityName}. Manejamos todo desde el embalaje hasta el montaje de muebles.`
        },
        {
          icon: Building,
          title: 'Mudanzas comerciales',
          description: `Servicios profesionales de reubicación de oficinas y negocios en ${translatedCityName}. Tiempo de inactividad mínimo, eficiencia máxima.`
        },
        {
          icon: Package,
          title: 'Embalaje y desempaquetado',
          description: `Servicios expertos de embalaje y desempaquetado en ${translatedCityName}. Protegemos sus pertenencias valiosas con cuidado.`
        },
        {
          icon: Truck,
          title: 'Mudanzas de larga distancia',
          description: `Servicios confiables de mudanza de larga distancia desde ${translatedCityName} a cualquier destino en Alemania y la UE.`
        }
      ]
    };
    return services[language as keyof typeof services] || services.en;
  };

  const getWhyChooseUs = () => {
    const cityName = cityData?.name || '';
    const translatedCityName = getCityDisplayName(cityName, language);
    const reasons = {
      en: [
        {
          icon: Star,
          title: '10+ Years Experience',
          description: `Over 10 years of professional moving experience in ${translatedCityName} and surrounding areas.`
        },
        {
          icon: Users,
          title: '5000+ Happy Customers',
          description: `More than 5000 satisfied customers who trusted us with their moves in ${translatedCityName}.`
        },
        {
          icon: Shield,
          title: 'Fully Insured',
          description: `Complete insurance coverage for all your belongings during the move in ${translatedCityName}.`
        },
        {
          icon: Award,
          title: 'Professional Team',
          description: `Experienced and trained professionals dedicated to making your move in ${translatedCityName} stress-free.`
        }
      ],
      pl: [
        {
          icon: Star,
          title: '10+ Lat Doświadczenia',
          description: `Ponad 10 lat profesjonalnego doświadczenia w przeprowadzkach w ${translatedCityName} i okolicach.`
        },
        {
          icon: Users,
          title: '5000+ Zadowolonych Klientów',
          description: `Ponad 5000 zadowolonych klientów, którzy zaufali nam w przeprowadzkach w ${translatedCityName}.`
        },
        {
          icon: Shield,
          title: 'W pełni ubezpieczeni',
          description: `Pełne ubezpieczenie wszystkich Twoich rzeczy podczas przeprowadzki w ${translatedCityName}.`
        },
        {
          icon: Award,
          title: 'Profesjonalny zespół',
          description: `Doświadczeni i przeszkoleni profesjonaliści, którzy dbają o to, aby Twoja przeprowadzka w ${translatedCityName} była bezstresowa.`
        }
      ],
      de: [
        {
          icon: Star,
          title: '10+ Jahre Erfahrung',
          description: `Über 10 Jahre professionelle Umzugserfahrung in ${translatedCityName} und Umgebung.`
        },
        {
          icon: Users,
          title: '5000+ Zufriedene Kunden',
          description: `Mehr als 5000 zufriedene Kunden, die uns mit ihren Umzügen in ${translatedCityName} vertraut haben.`
        },
        {
          icon: Shield,
          title: 'Vollständig versichert',
          description: `Vollständige Versicherungsabdeckung für alle Ihre Sachen während des Umzugs in ${translatedCityName}.`
        },
        {
          icon: Award,
          title: 'Professionelles Team',
          description: `Erfahrene und geschulte Fachleute, die sich dafür einsetzen, Ihren Umzug in ${translatedCityName} stressfrei zu gestalten.`
        }
      ],
      es: [
        {
          icon: Star,
          title: '10+ Años de Experiencia',
          description: `Más de 10 años de experiencia profesional en mudanzas en ${translatedCityName} y áreas circundantes.`
        },
        {
          icon: Users,
          title: '5000+ Clientes Satisfechos',
          description: `Más de 5000 clientes satisfechos que confiaron en nosotros para sus mudanzas en ${translatedCityName}.`
        },
        {
          icon: Shield,
          title: 'Completamente asegurado',
          description: `Cobertura de seguro completa para todas sus pertenencias durante la mudanza en ${translatedCityName}.`
        },
        {
          icon: Award,
          title: 'Equipo profesional',
          description: `Profesionales experimentados y capacitados dedicados a hacer que su mudanza en ${translatedCityName} sea libre de estrés.`
        }
      ]
    };
    return reasons[language as keyof typeof reasons] || reasons.en;
  };

  const getPageTexts = () => {
    const cityName = cityData?.name || '';
    const translatedCityName = getCityDisplayName(cityName, language);
    const texts = {
      en: {
        ourServices: `Our Services in ${translatedCityName}`,
        movingServices: `Moving Services ${translatedCityName}`,
        residentialMoving: `Residential Moving ${translatedCityName}`,
        commercialMoving: `Commercial Moving ${translatedCityName}`,
        packingServices: `Packing Services ${translatedCityName}`,
        longDistanceMoving: `Long Distance Moving ${translatedCityName}`,
        localExpertise: `Local Moving Expertise in ${translatedCityName}`,
        whyChooseUs: `Why Choose Our Moving Services in ${translatedCityName}?`,
        whyChooseUsSection: `Why Choose Us in ${translatedCityName}`,
        professionalCompany: `Professional Moving Company in ${translatedCityName}`,
        trustedPartner: `Moving Services ${translatedCityName} - Your Trusted Partner`,
        whyChooseCompany: `Why Choose Our Moving Company in ${translatedCityName}?`,
        localExpertiseTitle: `Local Expertise in ${translatedCityName}`,
        comprehensiveSolutions: `Comprehensive Moving Solutions ${translatedCityName}`,
        competitivePricing: `Competitive Pricing in ${translatedCityName}`,
        reliableService: `Reliable Service in ${translatedCityName}`,
        movingServicesAvailable: `Moving Services Available in ${translatedCityName}`,
        phone: 'Phone',
        email: 'Email',
        workingHours: 'Working Hours',
        monFri: 'Mon-Fri: 8:00-18:00',
        sat: 'Sat: 9:00-16:00',
        over10Years: `Over 10 years of experience in ${translatedCityName} and surrounding areas`,
        localKnowledge: `Local knowledge of ${translatedCityName} neighborhoods and traffic patterns`,
        professionalTeam: `Professional team familiar with ${translatedCityName} building regulations`,
        comprehensiveSolutionsDesc: `Comprehensive moving solutions tailored for ${translatedCityName} residents`,
        competitivePricingDesc: `Competitive pricing for moving services in ${translatedCityName}`,
        residentialMovingDesc: `Residential moving ${translatedCityName} - apartments and houses`,
        commercialMovingDesc: `Commercial moving ${translatedCityName} - offices and businesses`,
        packingServicesDesc: `Packing and unpacking services ${translatedCityName}`,
        furnitureAssembly: `Furniture assembly and disassembly ${translatedCityName}`,
        storageSolutions: `Storage solutions for ${translatedCityName} residents`,
        internationalMoving: `International moving from ${translatedCityName}`,
        residentialText: `Our residential moving services in ${translatedCityName} provide comprehensive solutions for homes and apartments of all sizes. We understand that moving can be stressful, which is why our experienced team in ${translatedCityName} handles every aspect of your move with care and professionalism. From packing your belongings to assembling furniture in your new home in ${translatedCityName}, we ensure a smooth transition.`,
        commercialText: `Professional commercial moving services in ${translatedCityName} help businesses minimize downtime during relocation. Our team in ${translatedCityName} specializes in office moves, retail relocations, and industrial equipment transport. We work efficiently to ensure your business operations in ${translatedCityName} continue with minimal disruption.`,
        packingText: `Expert packing and unpacking services in ${translatedCityName} protect your valuable belongings during the move. Our professional packers in ${translatedCityName} use high-quality materials and techniques to ensure everything arrives safely at your new location. We offer both full-service packing and partial packing options in ${translatedCityName}.`,
        longDistanceText: `Reliable long-distance moving services from ${translatedCityName} to any destination in Germany and the EU. Our experienced team handles cross-country moves with precision and care. Whether you're moving from ${translatedCityName} to another city or country, we provide comprehensive logistics solutions and ensure your belongings arrive safely and on time.`,
        trustedPartnerText: `As a leading moving company in ${translatedCityName}, we provide comprehensive relocation services tailored to meet the unique needs of ${translatedCityName} residents and businesses. Our local expertise in ${translatedCityName} ensures that every move is handled with precision and care.`,
        withinCityText: `Whether you're moving within ${translatedCityName} or relocating to another city, our experienced team in ${translatedCityName} has the knowledge and resources to make your move stress-free. We understand the local area of ${translatedCityName} and can navigate efficiently through the city's neighborhoods and traffic patterns.`,
        servicesIncludeText: `Our moving services in ${translatedCityName} include residential moves, commercial relocations, packing services, furniture assembly, and storage solutions. We serve all areas of ${translatedCityName} and surrounding communities with the same high level of professionalism and attention to detail.`,
        localExpertiseText: `Our team knows ${translatedCityName} inside and out, from the best routes to take during moves to understanding local building regulations and parking restrictions in ${translatedCityName}.`,
        comprehensiveText: `From small apartment moves to large commercial relocations in ${translatedCityName}, we offer complete moving solutions including packing, transportation, and setup services.`,
        pricingText: `We offer fair and transparent pricing for all our moving services in ${translatedCityName}, with no hidden fees or surprise charges.`,
        reputationText: `Our reputation in ${translatedCityName} is built on reliability, punctuality, and exceptional customer service. We're committed to making your move in ${translatedCityName} as smooth as possible.`
      },
      pl: {
        ourServices: `Nasze usługi w ${translatedCityName}`,
        movingServices: `Usługi przeprowadzkowe ${translatedCityName}`,
        residentialMoving: `Przeprowadzki mieszkaniowe ${translatedCityName}`,
        commercialMoving: `Przeprowadzki komercyjne ${translatedCityName}`,
        packingServices: `Usługi pakowania ${translatedCityName}`,
        longDistanceMoving: `Przeprowadzki długodystansowe ${translatedCityName}`,
        localExpertise: `Lokalna ekspertyza przeprowadzkowa w ${translatedCityName}`,
        whyChooseUs: `Dlaczego wybrać nasze usługi przeprowadzkowe w ${translatedCityName}?`,
        whyChooseUsSection: `Dlaczego wybrać nas w ${translatedCityName}`,
        professionalCompany: `Profesjonalna firma przeprowadzkowa w ${translatedCityName}`,
        trustedPartner: `Usługi przeprowadzkowe ${translatedCityName} - Twój zaufany partner`,
        whyChooseCompany: `Dlaczego wybrać naszą firmę przeprowadzkową w ${translatedCityName}?`,
        localExpertiseTitle: `Lokalna ekspertyza w ${translatedCityName}`,
        comprehensiveSolutions: `Kompletne rozwiązania przeprowadzkowe ${translatedCityName}`,
        competitivePricing: `Konkurencyjne ceny w ${translatedCityName}`,
        reliableService: `Niezawodna obsługa w ${translatedCityName}`,
        movingServicesAvailable: `Dostępne usługi przeprowadzkowe w ${translatedCityName}`,
        phone: 'Telefon',
        email: 'Email',
        workingHours: 'Godziny pracy',
        monFri: 'Pon-Pt: 8:00-18:00',
        sat: 'Sob: 9:00-16:00',
        over10Years: `Ponad 10 lat doświadczenia w ${translatedCityName} i okolicach`,
        localKnowledge: `Lokalna znajomość dzielnic i wzorców ruchu w ${translatedCityName}`,
        professionalTeam: `Profesjonalny zespół znający przepisy budowlane w ${translatedCityName}`,
        comprehensiveSolutionsDesc: `Kompletne rozwiązania przeprowadzkowe dostosowane dla mieszkańców ${translatedCityName}`,
        competitivePricingDesc: `Konkurencyjne ceny za usługi przeprowadzkowe w ${translatedCityName}`,
        residentialMovingDesc: `Przeprowadzki mieszkaniowe ${translatedCityName} - mieszkania i domy`,
        commercialMovingDesc: `Przeprowadzki komercyjne ${translatedCityName} - biura i firmy`,
        packingServicesDesc: `Usługi pakowania i rozpakowywania ${translatedCityName}`,
        furnitureAssembly: `Montaż i demontaż mebli ${translatedCityName}`,
        storageSolutions: `Rozwiązania magazynowe dla mieszkańców ${translatedCityName}`,
        internationalMoving: `Przeprowadzki międzynarodowe z ${translatedCityName}`,
        residentialText: `Nasze usługi przeprowadzek mieszkaniowych w ${translatedCityName} zapewniają kompleksowe rozwiązania dla domów i mieszkań wszystkich rozmiarów. Rozumiemy, że przeprowadzka może być stresująca, dlatego nasz doświadczony zespół w ${translatedCityName} zajmuje się każdym aspektem Twojej przeprowadzki z dbałością i profesjonalizmem. Od pakowania Twoich rzeczy po montaż mebli w nowym domu w ${translatedCityName}, zapewniamy płynne przejście.`,
        commercialText: `Profesjonalne usługi przeprowadzek komercyjnych w ${translatedCityName} pomagają firmom zminimalizować przestoje podczas relokacji. Nasz zespół w ${translatedCityName} specjalizuje się w przeprowadzkach biurowych, relokacjach handlowych i transporcie sprzętu przemysłowego. Pracujemy efektywnie, aby zapewnić płynne działanie Twojej firmy w ${translatedCityName} podczas przeprowadzki.`,
        packingText: `Eksperckie usługi pakowania i rozpakowywania w ${translatedCityName} chronią Twoje cenne rzeczy podczas przeprowadzki. Nasi profesjonalni pakowacze w ${translatedCityName} używają wysokiej jakości materiałów i sprawdzonych technik, aby bezpiecznie zapakować wszystko. Oferujemy zarówno pełne usługi pakowania w ${translatedCityName}, jak i opcje częściowego pakowania, aby sprostać Twoim konkretnym potrzebom.`,
        longDistanceText: `Niezawodne usługi przeprowadzek długodystansowych z ${translatedCityName} do każdego celu w Niemczech i UE. Nasz doświadczony zespół obsługuje przeprowadzki międzykrajowe z ${translatedCityName} z precyzją i dbałością. Czy przeprowadzasz się z ${translatedCityName} do innego niemieckiego miasta czy międzynarodowego celu, zapewniamy kompleksowe rozwiązania logistyczne.`,
        trustedPartnerText: `Jako wiodąca firma przeprowadzkowa w ${translatedCityName}, zapewniamy kompleksowe usługi relokacji dostosowane do unikalnych potrzeb mieszkańców i firm w ${translatedCityName}. Nasza lokalna ekspertyza w ${translatedCityName} zapewnia, że każda przeprowadzka jest obsługiwana z precyzją i dbałością.`,
        withinCityText: `Czy przeprowadzasz się w obrębie ${translatedCityName} czy relokujesz do innego miasta, nasz doświadczony zespół w ${translatedCityName} ma wiedzę i zasoby, aby Twoja przeprowadzka była bezstresowa. Rozumiemy lokalny obszar ${translatedCityName} i możemy efektywnie nawigować przez dzielnice miasta i wzorce ruchu.`,
        servicesIncludeText: `Nasze usługi przeprowadzkowe w ${translatedCityName} obejmują przeprowadzki mieszkaniowe, relokacje komercyjne, usługi pakowania, montaż mebli i rozwiązania magazynowe. Obsługujemy wszystkie obszary ${translatedCityName} i okoliczne społeczności z tym samym wysokim poziomem profesjonalizmu i uwagi do szczegółów.`,
        localExpertiseText: `Nasz zespół zna ${translatedCityName} od podszewki, od najlepszych tras do pokonania podczas przeprowadzek po zrozumienie lokalnych przepisów budowlanych i ograniczeń parkingowych w ${translatedCityName}.`,
        comprehensiveText: `Od małych przeprowadzek mieszkań po duże relokacje komercyjne w ${translatedCityName}, oferujemy kompletne rozwiązania przeprowadzkowe obejmujące pakowanie, transport i usługi konfiguracji.`,
        pricingText: `Oferujemy sprawiedliwe i przejrzyste ceny za wszystkie nasze usługi przeprowadzkowe w ${translatedCityName}, bez ukrytych opłat czy niespodzianek.`,
        reputationText: `Nasza reputacja w ${translatedCityName} opiera się na niezawodności, punktualności i wyjątkowej obsłudze klienta. Jesteśmy zaangażowani w to, aby Twoja przeprowadzka w ${translatedCityName} była jak najpłynniejsza.`
      },
      de: {
        ourServices: `Unsere Dienstleistungen in ${translatedCityName}`,
        movingServices: `Umzugsdienste ${translatedCityName}`,
        residentialMoving: `Wohnungsumzug ${translatedCityName}`,
        commercialMoving: `Geschäftsumzug ${translatedCityName}`,
        packingServices: `Verpackungsdienste ${translatedCityName}`,
        longDistanceMoving: `Fernumzug ${translatedCityName}`,
        localExpertise: `Lokale Umzugsexpertise in ${translatedCityName}`,
        whyChooseUs: `Warum unsere Umzugsdienste in ${translatedCityName} wählen?`,
        whyChooseUsSection: `Warum uns in ${translatedCityName} wählen`,
        professionalCompany: `Professionelle Umzugsfirma in ${translatedCityName}`,
        trustedPartner: `Umzugsdienste ${translatedCityName} - Ihr vertrauensvoller Partner`,
        whyChooseCompany: `Warum unsere Umzugsfirma in ${translatedCityName} wählen?`,
        localExpertiseTitle: `Lokale Expertise in ${translatedCityName}`,
        comprehensiveSolutions: `Umfassende Umzugslösungen ${translatedCityName}`,
        competitivePricing: `Wettbewerbsfähige Preise in ${translatedCityName}`,
        reliableService: `Zuverlässiger Service in ${translatedCityName}`,
        movingServicesAvailable: `Verfügbare Umzugsdienste in ${translatedCityName}`,
        phone: 'Telefon',
        email: 'E-Mail',
        workingHours: 'Arbeitszeiten',
        monFri: 'Mo-Fr: 8:00-18:00',
        sat: 'Sa: 9:00-16:00',
        over10Years: `Über 10 Jahre Erfahrung in ${translatedCityName} und Umgebung`,
        localKnowledge: `Lokale Kenntnisse der ${translatedCityName} Nachbarschaften und Verkehrsmuster`,
        professionalTeam: `Professionelles Team mit Kenntnissen der ${translatedCityName} Bauvorschriften`,
        comprehensiveSolutionsDesc: `Umfassende Umzugslösungen für ${translatedCityName} Bewohner`,
        competitivePricingDesc: `Wettbewerbsfähige Preise für Umzugsdienste in ${translatedCityName}`,
        residentialMovingDesc: `Wohnungsumzug ${translatedCityName} - Wohnungen und Häuser`,
        commercialMovingDesc: `Geschäftsumzug ${translatedCityName} - Büros und Unternehmen`,
        packingServicesDesc: `Verpackungs- und Auspackungsdienste ${translatedCityName}`,
        furnitureAssembly: `Möbelmontage und -demontage ${translatedCityName}`,
        storageSolutions: `Lagerungslösungen für ${translatedCityName} Bewohner`,
        internationalMoving: `Internationale Umzüge von ${translatedCityName}`,
        residentialText: `Unsere Wohnungsumzugsdienste in ${translatedCityName} bieten umfassende Lösungen für Häuser und Wohnungen aller Größen. Wir verstehen, dass Umzüge stressig sein können, weshalb unser erfahrenes Team in ${translatedCityName} jeden Aspekt Ihres Umzugs mit Sorgfalt und Professionalität behandelt. Von der Verpackung Ihrer Habseligkeiten bis zur Möbelmontage in Ihrem neuen Zuhause in ${translatedCityName} gewährleisten wir einen reibungslosen Übergang.`,
        commercialText: `Professionelle Geschäftsumzugsdienste in ${translatedCityName} helfen Unternehmen, Ausfallzeiten während der Umsiedlung zu minimieren. Unser Team in ${translatedCityName} ist auf Büroumzüge, Einzelhandelsverlagerungen und industriellen Gerätetransport spezialisiert. Wir arbeiten effizient, um sicherzustellen, dass Ihre Geschäftsabläufe in ${translatedCityName} mit minimalen Störungen weiterlaufen.`,
        packingText: `Experten-Verpackungs- und Auspackungsdienste in ${translatedCityName} schützen Ihre wertvollen Habseligkeiten während des Umzugs. Unsere professionellen Packer in ${translatedCityName} verwenden hochwertige Materialien und bewährte Techniken, um alles sicher zu verpacken. Wir bieten sowohl Vollservice-Verpackung in ${translatedCityName} als auch Teilverpackungsoptionen, um Ihren spezifischen Bedürfnissen gerecht zu werden.`,
        longDistanceText: `Zuverlässige Fernumzugsdienste von ${translatedCityName} zu jedem Ziel in Deutschland und der EU. Unser erfahrenes Team behandelt grenzüberschreitende Umzüge von ${translatedCityName} mit Präzision und Sorgfalt. Ob Sie von ${translatedCityName} in eine andere deutsche Stadt oder ein internationales Ziel umziehen, wir bieten umfassende Logistiklösungen.`,
        trustedPartnerText: `Als führendes Umzugsunternehmen in ${translatedCityName} bieten wir umfassende Umzugsdienste, die auf die einzigartigen Bedürfnisse von ${translatedCityName} Bewohnern und Unternehmen zugeschnitten sind. Unsere lokale Expertise in ${translatedCityName} stellt sicher, dass jeder Umzug mit Präzision und Sorgfalt behandelt wird.`,
        withinCityText: `Ob Sie innerhalb von ${translatedCityName} umziehen oder in eine andere Stadt umsiedeln, unser erfahrenes Team in ${translatedCityName} hat das Wissen und die Ressourcen, um Ihren Umzug stressfrei zu gestalten. Wir verstehen das lokale Gebiet von ${translatedCityName} und können effizient durch die Nachbarschaften und Verkehrsmuster der Stadt navigieren.`,
        servicesIncludeText: `Unsere Umzugsdienste in ${translatedCityName} umfassen Wohnungsumzüge, Geschäftsrelokationen, Verpackungsdienste, Möbelmontage und Lagerungslösungen. Wir bedienen alle Gebiete von ${translatedCityName} und umliegende Gemeinden mit dem gleichen hohen Maß an Professionalität und Aufmerksamkeit für Details.`,
        localExpertiseText: `Unser Team kennt ${translatedCityName} in- und auswendig, von den besten Routen während Umzügen bis zum Verständnis lokaler Bauvorschriften und Parkbeschränkungen in ${translatedCityName}.`,
        comprehensiveText: `Von kleinen Wohnungsumzügen bis hin zu großen Geschäftsrelokationen in ${translatedCityName} bieten wir komplette Umzugslösungen einschließlich Verpackung, Transport und Einrichtungsdienste.`,
        pricingText: `Wir bieten faire und transparente Preise für alle unsere Umzugsdienste in ${translatedCityName}, ohne versteckte Gebühren oder Überraschungsgebühren.`,
        reputationText: `Unser Ruf in ${translatedCityName} basiert auf Zuverlässigkeit, Pünktlichkeit und außergewöhnlichem Kundenservice. Wir sind verpflichtet, Ihren Umzug in ${translatedCityName} so reibungslos wie möglich zu gestalten.`
      },
      es: {
        ourServices: `Nuestros servicios en ${translatedCityName}`,
        movingServices: `Servicios de mudanza ${translatedCityName}`,
        residentialMoving: `Mudanzas residenciales ${translatedCityName}`,
        commercialMoving: `Mudanzas comerciales ${translatedCityName}`,
        packingServices: `Servicios de embalaje ${translatedCityName}`,
        longDistanceMoving: `Mudanzas de larga distancia ${translatedCityName}`,
        localExpertise: `Experiencia local en mudanzas en ${translatedCityName}`,
        whyChooseUs: `¿Por qué elegir nuestros servicios de mudanza en ${translatedCityName}?`,
        whyChooseUsSection: `¿Por qué elegirnos en ${translatedCityName}?`,
        professionalCompany: `Empresa profesional de mudanzas en ${translatedCityName}`,
        trustedPartner: `Servicios de mudanza ${translatedCityName} - Su socio de confianza`,
        whyChooseCompany: `¿Por qué elegir nuestra empresa de mudanzas en ${translatedCityName}?`,
        localExpertiseTitle: `Experiencia local en ${translatedCityName}`,
        comprehensiveSolutions: `Soluciones completas de mudanza ${translatedCityName}`,
        competitivePricing: `Precios competitivos en ${translatedCityName}`,
        reliableService: `Servicio confiable en ${translatedCityName}`,
        movingServicesAvailable: `Servicios de mudanza disponibles en ${translatedCityName}`,
        phone: 'Teléfono',
        email: 'Correo electrónico',
        workingHours: 'Horario de trabajo',
        monFri: 'Lun-Vie: 8:00-18:00',
        sat: 'Sáb: 9:00-16:00',
        over10Years: `Más de 10 años de experiencia en ${translatedCityName} y áreas circundantes`,
        localKnowledge: `Conocimiento local de los vecindarios y patrones de tráfico de ${translatedCityName}`,
        professionalTeam: `Equipo profesional familiarizado con las regulaciones de construcción de ${translatedCityName}`,
        comprehensiveSolutionsDesc: `Soluciones completas de mudanza adaptadas para residentes de ${translatedCityName}`,
        competitivePricingDesc: `Precios competitivos para servicios de mudanza en ${translatedCityName}`,
        residentialMovingDesc: `Mudanzas residenciales ${translatedCityName} - apartamentos y casas`,
        commercialMovingDesc: `Mudanzas comerciales ${translatedCityName} - oficinas y negocios`,
        packingServicesDesc: `Servicios de embalaje y desempaque ${translatedCityName}`,
        furnitureAssembly: `Ensamblaje y desensamblaje de muebles ${translatedCityName}`,
        storageSolutions: `Soluciones de almacenamiento para residentes de ${translatedCityName}`,
        internationalMoving: `Mudanzas internacionales desde ${translatedCityName}`,
        residentialText: `Nuestros servicios de mudanza residencial en ${translatedCityName} atienden todo tipo de hogares y apartamentos. Ya sea que se mude de un pequeño estudio en ${translatedCityName} o una gran casa familiar, nuestro equipo en ${translatedCityName} proporciona soluciones de mudanza personalizadas. Nos encargamos de todo, desde empacar sus pertenencias en ${translatedCityName} hasta configurar su nuevo hogar, asegurando una experiencia de mudanza sin estrés en ${translatedCityName}.`,
        commercialText: `Los servicios profesionales de mudanza comercial en ${translatedCityName} ayudan a las empresas a reubicarse eficientemente con un tiempo de inactividad mínimo. Nuestro equipo de mudanza comercial en ${translatedCityName} se especializa en mudanzas de oficinas, reubicaciones minoristas y transporte de equipos industriales. Entendemos la importancia de mantener sus operaciones comerciales en ${translatedCityName} funcionando sin problemas durante la mudanza.`,
        packingText: `Los servicios expertos de embalaje y desempaque en ${translatedCityName} aseguran que sus pertenencias valiosas estén protegidas durante la mudanza. Nuestros empacadores profesionales en ${translatedCityName} usan materiales de alta calidad y técnicas probadas para empacar todo de manera segura. Ofrecemos tanto embalaje de servicio completo en ${translatedCityName} como opciones de embalaje parcial para satisfacer sus necesidades específicas.`,
        longDistanceText: `Servicios confiables de mudanza de larga distancia desde ${translatedCityName} a cualquier destino en Alemania y la UE. Nuestro equipo experimentado maneja mudanzas transfronterizas desde ${translatedCityName} con precisión y cuidado. Ya sea que se mude desde ${translatedCityName} a otra ciudad alemana o destino internacional, proporcionamos soluciones logísticas completas.`,
        trustedPartnerText: `Como empresa líder de mudanzas en ${translatedCityName}, proporcionamos servicios completos de reubicación adaptados a las necesidades únicas de residentes y empresas de ${translatedCityName}. Nuestra experiencia local en ${translatedCityName} asegura que cada mudanza se maneje con precisión y cuidado.`,
        withinCityText: `Ya sea que se mude dentro de ${translatedCityName} o se reubique a otra ciudad, nuestro equipo experimentado en ${translatedCityName} tiene el conocimiento y los recursos para hacer que su mudanza sea libre de estrés. Entendemos el área local de ${translatedCityName} y podemos navegar eficientemente a través de los vecindarios y patrones de tráfico de la ciudad.`,
        servicesIncludeText: `Nuestros servicios de mudanza en ${translatedCityName} incluyen mudanzas residenciales, reubicaciones comerciales, servicios de embalaje, ensamblaje de muebles y soluciones de almacenamiento. Servimos todas las áreas de ${translatedCityName} y comunidades circundantes con el mismo alto nivel de profesionalismo y atención al detalle.`,
        localExpertiseText: `Nuestro equipo conoce ${translatedCityName} de adentro hacia afuera, desde las mejores rutas para tomar durante las mudanzas hasta entender las regulaciones de construcción locales y restricciones de estacionamiento en ${translatedCityName}.`,
        comprehensiveText: `Desde pequeñas mudanzas de apartamentos hasta grandes reubicaciones comerciales en ${translatedCityName}, ofrecemos soluciones completas de mudanza incluyendo embalaje, transporte y servicios de configuración.`,
        pricingText: `Ofrecemos precios justos y transparentes para todos nuestros servicios de mudanza en ${translatedCityName}, sin tarifas ocultas o cargos sorpresa.`,
        reputationText: `Nuestra reputación en ${translatedCityName} se construye sobre confiabilidad, puntualidad y servicio excepcional al cliente. Estamos comprometidos a hacer que su mudanza en ${translatedCityName} sea lo más fluida posible.`
      }
    };
    return texts[language as keyof typeof texts] || texts.en;
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
  const pageTexts = getPageTexts();
  const translatedCityName = getCityDisplayName(cityData?.name || '', language);

  return (
    <>
      <SEOHead 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      <div className="min-h-screen bg-moving-gray">
        <div className="pt-0 pb-8">


          {/* Hero Section */}
          <div className="bg-gradient-to-br from-moving-blue to-moving-darkblue text-white rounded-b-2xl p-8 md:p-12 lg:p-16 mb-12 md:mb-16 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
            </div>
            
            <div className="relative max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {language === 'pl' ? 'Specjalizacja: Wschodnie Niemcy' :
                     language === 'de' ? 'Spezialisierung: Ostdeutschland' :
                     language === 'es' ? 'Especialización: Este de Alemania' :
                     'Specialization: Eastern Germany'}
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                {headerText.heroTitle}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                {headerText.heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white hover:bg-gray-100 text-moving-blue font-semibold py-3 px-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  aria-label="Uzyskaj bezpłatną wycenę przeprowadzki"
                >
                  {headerText.getQuote}
                </Button>
                <Button 
                  className="bg-transparent border border-white text-white hover:bg-white hover:text-moving-blue font-semibold py-3 px-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  aria-label="Skontaktuj się z nami"
                >
                  {headerText.contactUs}
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Phone className="w-8 h-8 text-moving-blue mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">{pageTexts.phone}</h3>
                      <a href="tel:+4915223031473" className="text-moving-blue hover:underline">
                        +49 152 230 314 73
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Mail className="w-8 h-8 text-moving-blue mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">{pageTexts.email}</h3>
                      <a href="mailto:info@meisterumzuege24.de" className="text-moving-blue hover:underline">
                        info@meisterumzuege24.de
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="w-8 h-8 text-moving-blue mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">{pageTexts.workingHours}</h3>
                      <p className="text-sm">{pageTexts.monFri}</p>
                      <p className="text-sm">{pageTexts.sat}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Services */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <h2 className="text-3xl font-bold text-moving-dark text-center mb-8">
              {pageTexts.ourServices}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="text-center backdrop-blur-sm bg-white/80 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <service.icon className="w-12 h-12 text-moving-blue mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Detailed Services Section */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <h2 className="text-3xl font-bold text-moving-dark text-center mb-8">
              {pageTexts.movingServices}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-moving-dark mb-3">
                        {pageTexts.residentialMoving}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {pageTexts.residentialText}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-moving-dark mb-3">
                        {pageTexts.commercialMoving}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {pageTexts.commercialText}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-moving-dark mb-3">
                        {pageTexts.packingServices}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {pageTexts.packingText}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-moving-dark mb-3">
                        {pageTexts.longDistanceMoving}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {pageTexts.longDistanceText}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Local Expertise Section */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <h2 className="text-3xl font-bold text-moving-dark text-center mb-8">
              {pageTexts.localExpertise}
            </h2>
            <Card className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-moving-dark mb-4">
                      {pageTexts.whyChooseUs}
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-moving-blue mr-2">•</span>
                        <span>{pageTexts.over10Years}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-moving-blue mr-2">•</span>
                        <span>{pageTexts.localKnowledge}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-moving-blue mr-2">•</span>
                        <span>{pageTexts.professionalTeam}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-moving-blue mr-2">•</span>
                        <span>{pageTexts.comprehensiveSolutionsDesc}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-moving-blue mr-2">•</span>
                        <span>{pageTexts.competitivePricingDesc}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-moving-dark mb-4">
                      {pageTexts.movingServicesAvailable}
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-moving-blue mr-2">•</span>
                        <span>{pageTexts.residentialMovingDesc}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-moving-blue mr-2">•</span>
                        <span>{pageTexts.commercialMovingDesc}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-moving-blue mr-2">•</span>
                        <span>{pageTexts.packingServicesDesc}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-moving-blue mr-2">•</span>
                        <span>{pageTexts.furnitureAssembly}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-moving-blue mr-2">•</span>
                        <span>{pageTexts.storageSolutions}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-moving-blue mr-2">•</span>
                        <span>{pageTexts.internationalMoving}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Us */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <h2 className="text-3xl font-bold text-moving-dark text-center mb-8">
              {pageTexts.whyChooseUsSection}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((reason, index) => (
                <Card key={index} className="text-center backdrop-blur-sm bg-white/80 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <reason.icon className="w-12 h-12 text-moving-blue mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                    <p className="text-gray-600 text-sm">{reason.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional SEO Content */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <Card className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-moving-dark mb-6">
                  {pageTexts.professionalCompany}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-moving-dark mb-4">
                      {pageTexts.trustedPartner}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {pageTexts.trustedPartnerText}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {pageTexts.withinCityText}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {pageTexts.servicesIncludeText}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-moving-dark mb-4">
                      {pageTexts.whyChooseCompany}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-moving-dark mb-2">{pageTexts.localExpertiseTitle}</h4>
                        <p className="text-gray-600 text-sm">
                          {pageTexts.localExpertiseText}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-moving-dark mb-2">{pageTexts.comprehensiveSolutions}</h4>
                        <p className="text-gray-600 text-sm">
                          {pageTexts.comprehensiveText}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-moving-dark mb-2">{pageTexts.competitivePricing}</h4>
                        <p className="text-gray-600 text-sm">
                          {pageTexts.pricingText}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-moving-dark mb-2">{pageTexts.reliableService}</h4>
                        <p className="text-gray-600 text-sm">
                          {pageTexts.reputationText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <Card className="bg-moving-blue text-white rounded-lg p-8 text-center backdrop-blur-sm border border-white/20 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'de' ? `Bereit für den Umzug in ${translatedCityName}?` : 
               language === 'pl' ? `Gotowy na przeprowadzkę w ${translatedCityName}?` :
               language === 'es' ? `¿Listo para mudarse a ${translatedCityName}?` :
               `Ready to Move in ${translatedCityName}?`}
            </h2>
            <p className="text-lg mb-6">
              {language === 'de' ? `Erhalten Sie noch heute Ihr kostenloses Angebot und erleben Sie professionelle Umzugsdienste in ${translatedCityName}!` :
               language === 'pl' ? `Uzyskaj darmową wycenę już dziś i doświadcz profesjonalnych usług przeprowadzkowych w ${translatedCityName}!` :
               language === 'es' ? `¡Obtenga su presupuesto gratuito hoy y experimente servicios profesionales de mudanza en ${translatedCityName}!` :
               `Get your free quote today and experience professional moving services in ${translatedCityName}!`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button size="lg" className="bg-white text-moving-blue hover:bg-gray-100">
                {language === 'de' ? `Kostenloses Angebot für ${translatedCityName}` :
                 language === 'pl' ? `Darmowa wycena dla ${translatedCityName}` :
                 language === 'es' ? `Presupuesto gratis para ${translatedCityName}` :
                 `Get Free Quote for ${translatedCityName}`}
              </Button>
              <Button size="lg" className="bg-transparent border border-white text-white hover:bg-white hover:text-moving-blue">
                {language === 'de' ? `Kontaktieren Sie uns in ${translatedCityName}` :
                 language === 'pl' ? `Skontaktuj się z nami w ${translatedCityName}` :
                 language === 'es' ? `Contáctenos en ${translatedCityName}` :
                 `Contact Us in ${translatedCityName}`}
              </Button>
            </div>
            <p className="text-sm opacity-90">
              {language === 'de' ? `Professionelle Umzugsdienste in ${translatedCityName} - Wohnungs-, Geschäfts-, Verpackungs- und Fernumzüge` :
               language === 'pl' ? `Profesjonalne usługi przeprowadzkowe w ${translatedCityName} - Przeprowadzki mieszkaniowe, komercyjne, pakowanie i długodystansowe` :
               language === 'es' ? `Servicios profesionales de mudanza en ${translatedCityName} - Mudanzas residenciales, comerciales, embalaje y de larga distancia` :
               `Professional moving services in ${translatedCityName} - Residential, Commercial, Packing, and Long Distance moves`}
            </p>
            </Card>
          </div>

          {/* Final SEO Section */}
          <div className="max-w-6xl mx-auto px-4 mt-12">
            <Card className="bg-gray-50 rounded-lg p-8 backdrop-blur-sm border border-white/20 shadow-lg">
            <h2 className="text-2xl font-bold text-moving-dark mb-6 text-center">
              {language === 'de' ? `Umzugsdienste ${translatedCityName} - Komplette Umzugslösungen` :
               language === 'pl' ? `Usługi przeprowadzkowe ${translatedCityName} - Kompletne rozwiązania przeprowadzkowe` :
               language === 'es' ? `Servicios de mudanza ${translatedCityName} - Soluciones completas de mudanza` :
               `Moving Services ${translatedCityName} - Complete Relocation Solutions`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-moving-dark mb-3">
                  {language === 'de' ? `Wohnungsumzug ${translatedCityName}` :
                   language === 'pl' ? `Przeprowadzki mieszkaniowe ${translatedCityName}` :
                   language === 'es' ? `Mudanzas residenciales ${translatedCityName}` :
                   `Residential Moving ${translatedCityName}`}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {language === 'de' ? `Unsere Wohnungsumzugsdienste in ${translatedCityName} betreuen alle Arten von Häusern und Wohnungen. Ob Sie aus einem kleinen Studio in ${translatedCityName} oder einem großen Familienhaus umziehen, unser Team in ${translatedCityName} bietet personalisierte Umzugslösungen. Wir kümmern uns um alles, von der Verpackung Ihrer Habseligkeiten in ${translatedCityName} bis zur Einrichtung Ihres neuen Zuhauses und gewährleisten ein stressfreies Umzugserlebnis in ${translatedCityName}.` :
                   language === 'pl' ? `Nasze usługi przeprowadzek mieszkaniowych w ${translatedCityName} obsługują wszystkie rodzaje domów i mieszkań. Czy przeprowadzasz się z małego studia w ${translatedCityName} czy dużego domu rodzinnego, nasz zespół w ${translatedCityName} zapewnia spersonalizowane rozwiązania przeprowadzkowe. Zajmujemy się wszystkim, od pakowania Twoich rzeczy w ${translatedCityName} po urządzenie nowego domu, zapewniając bezstresowe doświadczenie przeprowadzki w ${translatedCityName}.` :
                   language === 'es' ? `Nuestros servicios de mudanza residencial en ${translatedCityName} atienden todo tipo de hogares y apartamentos. Ya sea que se mude de un pequeño estudio en ${translatedCityName} o una gran casa familiar, nuestro equipo en ${translatedCityName} proporciona soluciones de mudanza personalizadas. Nos encargamos de todo, desde empacar sus pertenencias en ${translatedCityName} hasta configurar su nuevo hogar, asegurando una experiencia de mudanza sin estrés en ${translatedCityName}.` :
                   `Our residential moving services in ${translatedCityName} cater to all types of homes and apartments. Whether you're moving from a small studio in ${translatedCityName} or a large family home, our team in ${translatedCityName} provides personalized moving solutions. We handle everything from packing your belongings in ${translatedCityName} to setting up your new home, ensuring a stress-free moving experience in ${translatedCityName}.`}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-moving-dark mb-3">
                  {language === 'de' ? `Geschäftsumzug ${translatedCityName}` :
                   language === 'pl' ? `Przeprowadzki komercyjne ${translatedCityName}` :
                   language === 'es' ? `Mudanzas comerciales ${translatedCityName}` :
                   `Commercial Moving ${translatedCityName}`}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {language === 'de' ? `Professionelle Geschäftsumzugsdienste in ${translatedCityName} helfen Unternehmen, sich effizient mit minimalen Ausfallzeiten umzusiedeln. Unser Geschäftsumzugsteam in ${translatedCityName} ist auf Büroumzüge, Einzelhandelsverlagerungen und industriellen Gerätetransport spezialisiert. Wir verstehen die Bedeutung, Ihre Geschäftsabläufe in ${translatedCityName} während des Umzugs reibungslos am Laufen zu halten.` :
                   language === 'pl' ? `Profesjonalne usługi przeprowadzek komercyjnych w ${translatedCityName} pomagają firmom przeprowadzać się efektywnie z minimalnymi przestojami. Nasz zespół przeprowadzek komercyjnych w ${translatedCityName} specjalizuje się w przeprowadzkach biurowych, relokacjach handlowych i transporcie sprzętu przemysłowego. Rozumiemy znaczenie utrzymania płynnego działania Twojej firmy w ${translatedCityName} podczas przeprowadzki.` :
                   language === 'es' ? `Los servicios profesionales de mudanza comercial en ${translatedCityName} ayudan a las empresas a reubicarse eficientemente con un tiempo de inactividad mínimo. Nuestro equipo de mudanza comercial en ${translatedCityName} se especializa en mudanzas de oficinas, reubicaciones minoristas y transporte de equipos industriales. Entendemos la importancia de mantener sus operaciones comerciales en ${translatedCityName} funcionando sin problemas durante la mudanza.` :
                   `Professional commercial moving services in ${translatedCityName} help businesses relocate efficiently with minimal downtime. Our commercial moving team in ${translatedCityName} specializes in office moves, retail relocations, and industrial equipment transport. We understand the importance of keeping your business operations in ${translatedCityName} running smoothly during the move.`}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-moving-dark mb-3">
                  {language === 'de' ? `Verpackungsdienste ${translatedCityName}` :
                   language === 'pl' ? `Usługi pakowania ${translatedCityName}` :
                   language === 'es' ? `Servicios de embalaje ${translatedCityName}` :
                   `Packing Services ${translatedCityName}`}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {language === 'de' ? `Experten-Verpackungs- und Auspackungsdienste in ${translatedCityName} stellen sicher, dass Ihre wertvollen Habseligkeiten während des Umzugs geschützt sind. Unsere professionellen Packer in ${translatedCityName} verwenden hochwertige Materialien und bewährte Techniken, um alles sicher zu verpacken. Wir bieten sowohl Vollservice-Verpackung in ${translatedCityName} als auch Teilverpackungsoptionen, um Ihren spezifischen Bedürfnissen gerecht zu werden.` :
                   language === 'pl' ? `Eksperckie usługi pakowania i rozpakowywania w ${translatedCityName} zapewniają ochronę Twoich cennych rzeczy podczas przeprowadzki. Nasi profesjonalni pakowacze w ${translatedCityName} używają wysokiej jakości materiałów i sprawdzonych technik, aby bezpiecznie zapakować wszystko. Oferujemy zarówno pełne usługi pakowania w ${translatedCityName}, jak i opcje częściowego pakowania, aby sprostać Twoim konkretnym potrzebom.` :
                   language === 'es' ? `Los servicios expertos de embalaje y desempaque en ${translatedCityName} aseguran que sus pertenencias valiosas estén protegidas durante la mudanza. Nuestros empacadores profesionales en ${translatedCityName} usan materiales de alta calidad y técnicas probadas para empacar todo de manera segura. Ofrecemos tanto embalaje de servicio completo en ${translatedCityName} como opciones de embalaje parcial para satisfacer sus necesidades específicas.` :
                   `Expert packing and unpacking services in ${translatedCityName} ensure your valuable belongings are protected during the move. Our professional packers in ${translatedCityName} use high-quality materials and proven techniques to pack everything safely. We offer both full-service packing in ${translatedCityName} and partial packing options to meet your specific needs.`}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-moving-dark mb-3">
                  {language === 'de' ? `Fernumzug von ${translatedCityName}` :
                   language === 'pl' ? `Przeprowadzki długodystansowe z ${translatedCityName}` :
                   language === 'es' ? `Mudanzas de larga distancia desde ${translatedCityName}` :
                   `Long Distance Moving from ${translatedCityName}`}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {language === 'de' ? `Zuverlässige Fernumzugsdienste von ${translatedCityName} zu jedem Ziel in Deutschland und der EU. Unser erfahrenes Team behandelt grenzüberschreitende Umzüge von ${translatedCityName} mit Präzision und Sorgfalt. Ob Sie von ${translatedCityName} in eine andere deutsche Stadt oder ein internationales Ziel umziehen, wir bieten umfassende Logistiklösungen.` :
                   language === 'pl' ? `Niezawodne usługi przeprowadzek długodystansowych z ${translatedCityName} do każdego celu w Niemczech i UE. Nasz doświadczony zespół obsługuje przeprowadzki międzykrajowe z ${translatedCityName} z precyzją i dbałością. Czy przeprowadzasz się z ${translatedCityName} do innego niemieckiego miasta czy międzynarodowego celu, zapewniamy kompleksowe rozwiązania logistyczne.` :
                   language === 'es' ? `Servicios confiables de mudanza de larga distancia desde ${translatedCityName} a cualquier destino en Alemania y la UE. Nuestro equipo experimentado maneja mudanzas transfronterizas desde ${translatedCityName} con precisión y cuidado. Ya sea que se mude desde ${translatedCityName} a otra ciudad alemana o destino internacional, proporcionamos soluciones logísticas completas.` :
                   `Reliable long-distance moving services from ${translatedCityName} to any destination in Germany and the EU. Our experienced team handles cross-country moves from ${translatedCityName} with precision and care. Whether you're moving from ${translatedCityName} to another German city or international destination, we provide comprehensive logistics solutions.`}
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600">
                <strong>
                  {language === 'de' ? `Umzugsfirma ${translatedCityName}` :
                   language === 'pl' ? `Firma przeprowadzkowa ${translatedCityName}` :
                   language === 'es' ? `Empresa de mudanzas ${translatedCityName}` :
                   `Moving Company ${translatedCityName}`}
                </strong> - {language === 'de' ? `Professionelle, zuverlässige und erschwingliche Umzugsdienste in ${translatedCityName} und Umgebung` :
                                   language === 'pl' ? `Profesjonalne, niezawodne i przystępne usługi przeprowadzkowe w ${translatedCityName} i okolicach` :
                                   language === 'es' ? `Servicios profesionales, confiables y asequibles de mudanza en ${translatedCityName} y áreas circundantes` :
                                   `Professional, Reliable, and Affordable Moving Services in ${translatedCityName} and Surrounding Areas`}
              </p>
            </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CityDetailPage; 
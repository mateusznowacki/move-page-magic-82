import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import { Card, CardContent } from '../components/ui/card';
import { 
  Users, 
  Truck, 
  Shield, 
  Star, 
  MapPin, 
  Clock,
  Award,
  Heart,
  Target,
  Zap,
  Globe,
  CheckCircle
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const { language } = useLanguage();

  const getSEOData = () => {
    const seoData = {
      pl: {
        title: "O Nas - Meister Umzüge 24 | Profesjonalne Usługi Przeprowadzkowe",
        description: "Poznaj naszą firmę przeprowadzkową z 10+ latami doświadczenia we wschodnich Niemczech. Specjalizujemy się w przeprowadzkach mieszkaniowych, biurowych i międzynarodowych.",
        keywords: "o nas przeprowadzki, firma przeprowadzkowa, doświadczenie przeprowadzki, przeprowadzki wschodnie Niemcy"
      },
      de: {
        title: "Über Uns - Meister Umzüge 24 | Professionelle Umzugsdienste",
        description: "Lernen Sie unser Umzugsunternehmen mit über 10 Jahren Erfahrung in Ostdeutschland kennen. Wir sind spezialisiert auf Wohnungs-, Büro- und internationale Umzüge.",
        keywords: "über uns Umzug, Umzugsunternehmen, Umzugserfahrung, Umzug Ostdeutschland"
      },
      es: {
        title: "Sobre Nosotros - Meister Umzüge 24 | Servicios Profesionales de Mudanza",
        description: "Conozca nuestra empresa de mudanzas con más de 10 años de experiencia en el este de Alemania. Nos especializamos en mudanzas residenciales, comerciales e internacionales.",
        keywords: "sobre nosotros mudanza, empresa mudanza, experiencia mudanza, mudanza este Alemania"
      },
      en: {
        title: "About Us - Meister Umzüge 24 | Professional Moving Services",
        description: "Learn about our moving company with over 10 years of experience in Eastern Germany. We specialize in residential, commercial and international moves.",
        keywords: "about us moving, moving company, moving experience, moving Eastern Germany"
      }
    };
    return seoData[language as keyof typeof seoData] || seoData.en;
  };

  const seoData = getSEOData();

  const getHeaderText = () => {
    const texts = {
      en: {
        title: "About Us",
        subtitle: "Your Trusted Moving Partner in Eastern Germany",
        description: "We are a professional moving company with over 10 years of experience, specializing in moving services throughout Eastern Germany with comprehensive solutions.",
        story: "Our Story",
        mission: "Our Mission",
        values: "Our Values"
      },
      pl: {
        title: "O Nas",
        subtitle: "Twój zaufany partner przeprowadzkowy we wschodnich Niemczech",
        description: "Jesteśmy profesjonalną firmą przeprowadzkową z ponad 10-letnim doświadczeniem, specjalizującą się w usługach przeprowadzkowych we wschodnich Niemczech z kompleksowymi rozwiązaniami.",
        story: "Nasza Historia",
        mission: "Nasza Misja",
        values: "Nasze Wartości"
      },
      de: {
        title: "Über Uns",
        subtitle: "Ihr vertrauensvoller Umzugspartner in Ostdeutschland",
        description: "Wir sind ein professionelles Umzugsunternehmen mit über 10 Jahren Erfahrung, das sich auf Umzugsdienste in ganz Ostdeutschland mit umfassenden Lösungen spezialisiert.",
        story: "Unsere Geschichte",
        mission: "Unsere Mission",
        values: "Unsere Werte"
      },
      es: {
        title: "Sobre Nosotros",
        subtitle: "Su socio de confianza para mudanzas en el este de Alemania",
        description: "Somos una empresa profesional de mudanzas con más de 10 años de experiencia, especializada en servicios de mudanza en el este de Alemania con soluciones completas.",
        story: "Nuestra Historia",
        mission: "Nuestra Misión",
        values: "Nuestros Valores"
      }
    };
    return texts[language as keyof typeof texts] || texts.en;
  };

  const headerText = getHeaderText();

  const stats = [
    {
      icon: Users,
      number: "5000+",
      label: {
        en: "Happy Customers",
        pl: "Zadowolonych klientów",
        de: "Zufriedene Kunden",
        es: "Clientes satisfechos"
      },
      color: "text-moving-blue"
    },
    {
      icon: Truck,
      number: "10+",
      label: {
        en: "Years Experience",
        pl: "Lat doświadczenia",
        de: "Jahre Erfahrung",
        es: "Años de experiencia"
      },
      color: "text-moving-blue"
    },
    {
      icon: MapPin,
      number: "6",
      label: {
        en: "Eastern States",
        pl: "Landów wschodnich",
        de: "Ostdeutsche Länder",
        es: "Estados del este"
      },
      color: "text-moving-blue"
    },
    {
      icon: Star,
      number: "4.9",
      label: {
        en: "Customer Rating",
        pl: "Ocena klientów",
        de: "Kundenbewertung",
        es: "Valoración de clientes"
      },
      color: "text-moving-blue"
    },
    {
      icon: Shield,
      number: "100%",
      label: {
        en: "Insured Moves",
        pl: "Ubezpieczonych przeprowadzek",
        de: "Versicherte Umzüge",
        es: "Mudanzas aseguradas"
      },
      color: "text-moving-blue"
    },
    {
      icon: Clock,
      number: "24/7",
      label: {
        en: "Customer Support",
        pl: "Wsparcie klienta",
        de: "Kundenservice",
        es: "Soporte al cliente"
      },
      color: "text-moving-blue"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: {
        en: "Customer Care",
        pl: "Troska o klienta",
        de: "Kundenbetreuung",
        es: "Atención al cliente"
      },
      description: {
        en: "We put our customers first, ensuring their satisfaction with every move.",
        pl: "Stawiamy naszych klientów na pierwszym miejscu, zapewniając ich satysfakcję przy każdej przeprowadzce.",
        de: "Wir stellen unsere Kunden an erste Stelle und sorgen für ihre Zufriedenheit bei jedem Umzug.",
        es: "Ponemos a nuestros clientes en primer lugar, asegurando su satisfacción con cada mudanza."
      }
    },
    {
      icon: Target,
      title: {
        en: "Reliability",
        pl: "Niezawodność",
        de: "Zuverlässigkeit",
        es: "Confiabilidad"
      },
      description: {
        en: "We deliver on our promises with punctuality and professional service.",
        pl: "Dotrzymujemy naszych obietnic z punktualnością i profesjonalną obsługą.",
        de: "Wir halten unsere Versprechen mit Pünktlichkeit und professionellem Service.",
        es: "Cumplimos nuestras promesas con puntualidad y servicio profesional."
      }
    },
    {
      icon: Zap,
      title: {
        en: "Efficiency",
        pl: "Efektywność",
        de: "Effizienz",
        es: "Eficiencia"
      },
      description: {
        en: "We complete moves quickly and efficiently without compromising quality.",
        pl: "Wykonujemy przeprowadzki szybko i efektywnie bez kompromisów w jakości.",
        de: "Wir führen Umzüge schnell und effizient durch, ohne die Qualität zu beeinträchtigen.",
        es: "Completamos las mudanzas de manera rápida y eficiente sin comprometer la calidad."
      }
    },
    {
      icon: Globe,
      title: {
        en: "International",
        pl: "Międzynarodowość",
        de: "Internationalität",
        es: "Internacionalidad"
      },
      description: {
        en: "We serve customers from all over the world with multilingual support.",
        pl: "Obsługujemy klientów z całego świata z wielojęzycznym wsparciem.",
        de: "Wir betreuen Kunden aus der ganzen Welt mit mehrsprachiger Unterstützung.",
        es: "Servimos a clientes de todo el mundo con soporte multilingüe."
      }
    }
  ];

  return (
    <>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical="/uber-uns"
      />
      <div className="min-h-screen bg-moving-gray">
      <div className="pt-0 pb-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-moving-blue to-moving-darkblue text-white rounded-b-2xl p-6 sm:p-8 md:p-12 mb-12 md:mb-16 overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8"></div>
          </div>
          
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">
                  {language === 'pl' ? 'Specjalizacja: Wschodnie Niemcy' :
                   language === 'de' ? 'Spezialisierung: Ostdeutschland' :
                   language === 'es' ? 'Especialización: Este de Alemania' :
                   'Specialization: Eastern Germany'}
                </span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              {headerText.title}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              {headerText.subtitle}
            </p>
            
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto px-4 mb-6">
              {headerText.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <div className="text-xl sm:text-2xl font-bold mb-1">10+</div>
                <div className="text-xs sm:text-sm text-white/80">
                  {language === 'pl' ? 'Lat doświadczenia' :
                   language === 'de' ? 'Jahre Erfahrung' :
                   language === 'es' ? 'Años de experiencia' :
                   'Years Experience'}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <div className="text-xl sm:text-2xl font-bold mb-1">6</div>
                <div className="text-xs sm:text-sm text-white/80">
                  {language === 'pl' ? 'Landów wschodnich' :
                   language === 'de' ? 'Ostdeutsche Länder' :
                   language === 'es' ? 'Estados del este' :
                   'Eastern States'}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <div className="text-xl sm:text-2xl font-bold mb-1">24/7</div>
                <div className="text-xs sm:text-sm text-white/80">
                  {language === 'pl' ? 'Wsparcie klienta' :
                   language === 'de' ? 'Kundenservice' :
                   language === 'es' ? 'Soporte al cliente' :
                   'Customer Support'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-moving-dark mb-8 text-center">
            {language === 'pl' ? 'Jak działamy' :
             language === 'de' ? 'Wie wir arbeiten' :
             language === 'es' ? 'Cómo trabajamos' :
             'How We Work'}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <IconComponent className={`w-12 h-12 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                    <div className="text-3xl font-bold text-moving-dark mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label[language as keyof typeof stat.label]}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-moving-dark mb-6 text-center">
              {headerText.story}
            </h2>
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                {language === 'pl' ? 
                  'Rozpoczęliśmy naszą działalność w 2014 roku z prostym celem: zapewnić najwyższej jakości usługi przeprowadzkowe we wschodnich Niemczech. Przez ponad dekadę rozwinęliśmy się z małej lokalnej firmy w uznanego partnera przeprowadzkowego, specjalizującego się w regionie wschodnim.' :
                 language === 'de' ? 
                  'Wir begannen unsere Tätigkeit im Jahr 2014 mit einem einfachen Ziel: hochwertige Umzugsdienste in Ostdeutschland zu bieten. Über ein Jahrzehnt haben wir uns von einem kleinen lokalen Unternehmen zu einem anerkannten Umzugspartner entwickelt, der sich auf die östliche Region spezialisiert.' :
                 language === 'es' ? 
                  'Comenzamos nuestras operaciones en 2014 con un objetivo simple: proporcionar servicios de mudanza de la más alta calidad en el este de Alemania. Durante más de una década, hemos evolucionado de una pequeña empresa local a un socio de mudanzas reconocido, especializado en la región oriental.' :
                 'We started our operations in 2014 with a simple goal: to provide the highest quality moving services in Eastern Germany. Over more than a decade, we have grown from a small local company to a recognized moving partner, specializing in the eastern region.'}
              </p>
              <p>
                {language === 'pl' ? 
                  'Dzisiaj jesteśmy dumni z naszego zespołu doświadczonych profesjonalistów, nowoczesnego sprzętu i niezmiennego zaangażowania w satysfakcję klienta. Specjalizujemy się w przeprowadzkach w landach: Thüringen, Sachsen, Sachsen-Anhalt, Brandenburg, Mecklenburg-Vorpommern i Berlin.' :
                 language === 'de' ? 
                  'Heute sind wir stolz auf unser Team erfahrener Fachleute, moderne Ausrüstung und unerschütterliches Engagement für Kundenzufriedenheit. Wir sind spezialisiert auf Umzüge in den Ländern: Thüringen, Sachsen, Sachsen-Anhalt, Brandenburg, Mecklenburg-Vorpommern und Berlin.' :
                 language === 'es' ? 
                  'Hoy estamos orgullosos de nuestro equipo de profesionales experimentados, equipamiento moderno y compromiso inquebrantable con la satisfacción del cliente. Nos especializamos en mudanzas en los estados: Thüringen, Sachsen, Sachsen-Anhalt, Brandenburg, Mecklenburg-Vorpommern y Berlin.' :
                 'Today, we are proud of our team of experienced professionals, modern equipment, and unwavering commitment to customer satisfaction. We specialize in moves in the states: Thüringen, Sachsen, Sachsen-Anhalt, Brandenburg, Mecklenburg-Vorpommern, and Berlin.'}
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-moving-dark mb-8 text-center">
            {headerText.values}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <IconComponent className="w-8 h-8 text-moving-blue mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-moving-dark mb-2">
                          {value.title[language as keyof typeof value.title]}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {value.description[language as keyof typeof value.description]}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-moving-dark mb-6 text-center">
              {headerText.mission}
            </h2>
            <div className="prose max-w-none text-center text-gray-600">
              <p className="text-lg">
                {language === 'pl' ? 
                  'Naszą misją jest zapewnienie bezstresowych, bezpiecznych i efektywnych przeprowadzek we wschodnich Niemczech dla wszystkich naszych klientów, wykorzystując nasze doświadczenie, nowoczesny sprzęt i niezmienną dbałość o szczegóły.' :
                 language === 'de' ? 
                  'Unsere Mission ist es, stressfreie, sichere und effiziente Umzüge in Ostdeutschland für alle unsere Kunden zu gewährleisten, indem wir unsere Erfahrung, moderne Ausrüstung und unerschütterliche Aufmerksamkeit für Details nutzen.' :
                 language === 'es' ? 
                  'Nuestra misión es proporcionar mudanzas sin estrés, seguras y eficientes en el este de Alemania para todos nuestros clientes, utilizando nuestra experiencia, equipamiento moderno y atención inquebrantable a los detalles.' :
                 'Our mission is to provide stress-free, safe, and efficient moves in Eastern Germany for all our customers, using our experience, modern equipment, and unwavering attention to detail.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutPage; 
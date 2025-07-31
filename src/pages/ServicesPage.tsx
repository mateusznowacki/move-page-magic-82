
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Home, 
  Building2, 
  Package, 
  Truck, 
  Shield, 
  Wrench, 
  Lightbulb, 
  Square, 
  Paintbrush, 
  Sparkles, 
  ShoppingCart, 
  Globe,
  CheckCircle,
  Phone
} from 'lucide-react';

const ServicesPage: React.FC = () => {
  const { t, getServiceData, language } = useLanguage();
  const servicesData = getServiceData();



  const getIconComponent = (serviceId: number) => {
    const iconMap: { [key: number]: React.ComponentType<any> } = {
      1: Home,
      2: Building2,
      3: Package,
      4: Truck,
      5: Shield,
      6: Wrench,
      7: Lightbulb,
      8: Square,
      9: Paintbrush,
      10: Sparkles,
      11: ShoppingCart,
      12: Globe
    };
    return iconMap[serviceId] || Package;
  };

  const getHeaderText = () => {
    const texts = {
      en: {
        title: "Our Services",
        subtitle: "Complete Moving Solutions for Home and Business in Eastern Germany",
        description: "We offer comprehensive moving services throughout Eastern Germany with over 10 years of experience. From residential moves to international relocations, our professional team ensures a smooth and stress-free moving experience.",
        features: "Why Choose Our Services",

      },
      pl: {
        title: "Nasze Usługi",
        subtitle: "Kompletne rozwiązania przeprowadzkowe dla domu i firmy we wschodnich Niemczech",
        description: "Oferujemy kompleksowe usługi przeprowadzkowe we wschodnich Niemczech z ponad 10-letnim doświadczeniem. Od przeprowadzek mieszkaniowych po międzynarodowe, nasz profesjonalny zespół zapewnia płynne i bezstresowe doświadczenie przeprowadzkowe.",
        features: "Dlaczego warto wybrać nasze usługi",

      },
      de: {
        title: "Unsere Dienstleistungen",
        subtitle: "Vollständige Umzugslösungen für Zuhause und Unternehmen in Ostdeutschland",
        description: "Wir bieten umfassende Umzugsdienste in ganz Ostdeutschland mit über 10 Jahren Erfahrung. Von Wohnungsumzügen bis hin zu internationalen Umzügen sorgt unser professionelles Team für ein reibungsloses und stressfreies Umzugserlebnis.",
        features: "Warum unsere Dienstleistungen wählen",

      },
      es: {
        title: "Nuestros Servicios",
        subtitle: "Soluciones completas de mudanza para hogar y empresa en el este de Alemania",
        description: "Ofrecemos servicios completos de mudanza en el este de Alemania con más de 10 años de experiencia. Desde mudanzas residenciales hasta mudanzas internacionales, nuestro equipo profesional garantiza una experiencia de mudanza fluida y sin estrés.",
        features: "Por qué elegir nuestros servicios",

      }
    };
    return texts[language as keyof typeof texts] || texts.en;
  };

  const headerText = getHeaderText();

  const features = [
    {
      icon: CheckCircle,
      title: { en: "Professional Team", pl: "Profesjonalny zespół", de: "Professionelles Team", es: "Equipo profesional" },
      description: { en: "Experienced movers with 10+ years in the industry", pl: "Doświadczeni przeprowadzkowcy z 10+ latami w branży", de: "Erfahrene Umzugshelfer mit über 10 Jahren in der Branche", es: "Mudadores experimentados con más de 10 años en la industria" }
    },
    {
      icon: Shield,
      title: { en: "Fully Insured", pl: "W pełni ubezpieczeni", de: "Vollständig versichert", es: "Totalmente asegurados" },
      description: { en: "Complete insurance coverage for your belongings", pl: "Pełne ubezpieczenie dla Twoich rzeczy", de: "Vollständige Versicherungsabdeckung für Ihre Sachen", es: "Cobertura de seguro completa para sus pertenencias" }
    },
    {
      icon: Truck,
      title: { en: "Modern Equipment", pl: "Nowoczesny sprzęt", de: "Moderne Ausrüstung", es: "Equipamiento moderno" },
      description: { en: "Latest moving equipment and protective materials", pl: "Najnowszy sprzęt przeprowadzkowy i materiały ochronne", de: "Neueste Umzugsausrüstung und Schutzmaterialien", es: "Último equipamiento de mudanza y materiales protectores" }
    },
    {
      icon: CheckCircle,
      title: { en: "24/7 Support", pl: "Wsparcie 24/7", de: "24/7 Unterstützung", es: "Soporte 24/7" },
      description: { en: "Round-the-clock customer support and assistance", pl: "Całodobowe wsparcie klienta i pomoc", de: "Rund-um-die-Uhr-Kundenservice und Unterstützung", es: "Soporte al cliente y asistencia las 24 horas" }
    }
  ];

  return (
    <div className="min-h-screen bg-moving-gray">
      <div className="px-4 pt-24 pb-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-moving-blue to-moving-darkblue text-white rounded-2xl p-6 sm:p-8 md:p-12 mb-12 md:mb-16 overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
          </div>
          
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
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
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto px-4">
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

        {/* Features */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-moving-dark mb-8 text-center">
            {headerText.features}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <IconComponent className="w-12 h-12 text-moving-blue mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-moving-dark mb-2">
                      {feature.title[language as keyof typeof feature.title]}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description[language as keyof typeof feature.description]}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => {
              const IconComponent = getIconComponent(service.id);
              const isInternational = service.id === 12;
              
              return (
                <Card key={service.id} className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="relative">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-8 h-8 text-moving-blue" />
                      <CardTitle className="text-xl group-hover:text-moving-blue transition-colors pr-16">
                        {service.title}
                      </CardTitle>
                    </div>
                    {isInternational && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-moving-blue text-white px-3 py-1 text-sm font-semibold rounded-bl-lg shadow-md">
                          {language === 'pl' ? 'Nowość' : 
                           language === 'de' ? 'Neu' : 
                           language === 'es' ? 'Nuevo' : 'New'}
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* SEO Content */}
        <div className="max-w-6xl mx-auto mt-16 space-y-8">
          {/* Main SEO Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-moving-dark mb-4">
                {language === 'pl' ? 'Profesjonalne usługi przeprowadzkowe w Niemczech' :
                 language === 'de' ? 'Professionelle Umzugsdienste in Deutschland' :
                 language === 'es' ? 'Servicios profesionales de mudanza en Alemania' :
                 'Professional Moving Services in Germany'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'pl' ? 
                  'Oferujemy kompleksowe usługi przeprowadzkowe w całych Niemczech z ponad 10-letnim doświadczeniem. Nasz zespół profesjonalistów specjalizuje się w przeprowadzkach mieszkaniowych, komercyjnych, międzynarodowych oraz dodatkowych usługach takich jak pakowanie, montaż mebli i rozwiązania magazynowe.' :
                 language === 'de' ? 
                  'Wir bieten umfassende Umzugsdienste in ganz Deutschland mit über 10 Jahren Erfahrung. Unser Team von Fachleuten ist auf Wohnungs-, Geschäfts- und internationale Umzüge sowie zusätzliche Dienstleistungen wie Verpackung, Möbelmontage und Lagerlösungen spezialisiert.' :
                 language === 'es' ? 
                  'Ofrecemos servicios completos de mudanza en toda Alemania con más de 10 años de experiencia. Nuestro equipo de profesionales se especializa en mudanzas residenciales, comerciales, internacionales y servicios adicionales como empaquetado, montaje de muebles y soluciones de almacenamiento.' :
                 'We offer comprehensive moving services throughout Germany with over 10 years of experience. Our team of professionals specializes in residential, commercial, and international moves, as well as additional services such as packing, furniture assembly, and storage solutions.'}
              </p>
              <p className="text-gray-600 mb-4">
                {language === 'pl' ? 
                  'Każda usługa jest wykonywana z najwyższą starannością, wykorzystując nowoczesny sprzęt i materiały ochronne. Zapewniamy pełne ubezpieczenie, całodobowe wsparcie klienta oraz indywidualne podejście do każdego projektu. Nasze usługi obejmują przeprowadzki na terenie całych Niemiec oraz do wszystkich krajów UE.' :
                 language === 'de' ? 
                  'Jede Dienstleistung wird mit größter Sorgfalt unter Verwendung modernster Ausrüstung und Schutzmaterialien durchgeführt. Wir bieten vollständige Versicherung, 24/7-Kundenservice und einen individuellen Ansatz für jedes Projekt. Unsere Dienstleistungen umfassen Umzüge in ganz Deutschland und in alle EU-Länder.' :
                 language === 'es' ? 
                  'Cada servicio se realiza con el máximo cuidado, utilizando equipamiento moderno y materiales protectores. Ofrecemos seguro completo, servicio al cliente 24/7 y un enfoque individualizado para cada proyecto. Nuestros servicios incluyen mudanzas en toda Alemania y a todos los países de la UE.' :
                 'Each service is performed with the utmost care using modern equipment and protective materials. We provide complete insurance, 24/7 customer support, and an individualized approach to each project. Our services include moves throughout Germany and to all EU countries.'}
              </p>
            </div>
          </div>

          {/* Detailed Services Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose max-w-none">
              <h3 className="text-xl font-bold text-moving-dark mb-4">
                {language === 'pl' ? 'Szczegółowe usługi przeprowadzkowe' :
                 language === 'de' ? 'Detaillierte Umzugsdienste' :
                 language === 'es' ? 'Servicios detallados de mudanza' :
                 'Detailed Moving Services'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-moving-dark mb-2">
                    {language === 'pl' ? 'Przeprowadzki mieszkaniowe' :
                     language === 'de' ? 'Wohnungsumzüge' :
                     language === 'es' ? 'Mudanzas residenciales' :
                     'Residential Moving'}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {language === 'pl' ? 
                      'Kompletne przeprowadzki mieszkań i domów z pełnym pakowaniem, transportem i rozpakowywaniem. Oferujemy usługi dla mieszkań o każdej wielkości.' :
                     language === 'de' ? 
                      'Vollständige Wohnungs- und Hausumzüge mit vollständiger Verpackung, Transport und Auspackung. Wir bieten Dienstleistungen für Wohnungen jeder Größe.' :
                     language === 'es' ? 
                      'Mudanzas completas de apartamentos y casas con empaquetado, transporte y desempaquetado completos. Ofrecemos servicios para apartamentos de cualquier tamaño.' :
                     'Complete apartment and house moves with full packing, transport, and unpacking. We offer services for apartments of any size.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-moving-dark mb-2">
                    {language === 'pl' ? 'Przeprowadzki komercyjne' :
                     language === 'de' ? 'Geschäftsumzüge' :
                     language === 'es' ? 'Mudanzas comerciales' :
                     'Commercial Moving'}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {language === 'pl' ? 
                      'Profesjonalne przeprowadzki biur, sklepów i firm z minimalizacją przestojów. Specjalizujemy się w przeprowadzkach na duże odległości.' :
                     language === 'de' ? 
                      'Professionelle Büro-, Geschäfts- und Firmenumzüge mit minimalen Ausfallzeiten. Wir sind auf Langstreckenumzüge spezialisiert.' :
                     language === 'es' ? 
                      'Mudanzas profesionales de oficinas, tiendas y empresas con minimización de tiempo de inactividad. Nos especializamos en mudanzas de larga distancia.' :
                     'Professional office, store, and company moves with minimal downtime. We specialize in long-distance moves.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-moving-dark mb-2">
                    {language === 'pl' ? 'Przeprowadzki międzynarodowe' :
                     language === 'de' ? 'Internationale Umzüge' :
                     language === 'es' ? 'Mudanzas internacionales' :
                     'International Moving'}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {language === 'pl' ? 
                      'Przeprowadzki do wszystkich krajów UE z obsługą celną i logistyką międzynarodową. Zapewniamy kompleksowe rozwiązania transportowe.' :
                     language === 'de' ? 
                      'Umzüge in alle EU-Länder mit Zollabfertigung und internationaler Logistik. Wir bieten umfassende Transportlösungen.' :
                     language === 'es' ? 
                      'Mudanzas a todos los países de la UE con tramitación aduanera y logística internacional. Ofrecemos soluciones de transporte completas.' :
                     'Moves to all EU countries with customs handling and international logistics. We provide comprehensive transport solutions.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-moving-dark mb-2">
                    {language === 'pl' ? 'Usługi dodatkowe' :
                     language === 'de' ? 'Zusätzliche Dienstleistungen' :
                     language === 'es' ? 'Servicios adicionales' :
                     'Additional Services'}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {language === 'pl' ? 
                      'Pakowanie, montaż mebli, malowanie ścian, czyszczenie i naprawa mebli. Oferujemy również sprzedaż produktów czyszczących.' :
                     language === 'de' ? 
                      'Verpackung, Möbelmontage, Wandmalerei, Möbelreinigung und -reparatur. Wir bieten auch den Verkauf von Reinigungsprodukten.' :
                     language === 'es' ? 
                      'Empaquetado, montaje de muebles, pintura de paredes, limpieza y reparación de muebles. También ofrecemos venta de productos de limpieza.' :
                     'Packing, furniture assembly, wall painting, furniture cleaning and repair. We also offer cleaning products for sale.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose max-w-none">
              <h3 className="text-xl font-bold text-moving-dark mb-4">
                {language === 'pl' ? 'Dlaczego warto wybrać nasze usługi przeprowadzkowe?' :
                 language === 'de' ? 'Warum unsere Umzugsdienste wählen?' :
                 language === 'es' ? '¿Por qué elegir nuestros servicios de mudanza?' :
                 'Why Choose Our Moving Services?'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-moving-dark mb-2">
                    {language === 'pl' ? 'Doświadczenie i profesjonalizm' :
                     language === 'de' ? 'Erfahrung und Professionalität' :
                     language === 'es' ? 'Experiencia y profesionalismo' :
                     'Experience and Professionalism'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {language === 'pl' ? 
                      'Ponad 10 lat doświadczenia w branży przeprowadzkowej we wschodnich Niemczech. Nasz zespół składa się z wykwalifikowanych specjalistów z certyfikatami.' :
                     language === 'de' ? 
                      'Über 10 Jahre Erfahrung in der Umzugsbranche in Ostdeutschland. Unser Team besteht aus qualifizierten Fachleuten mit Zertifikaten.' :
                     language === 'es' ? 
                      'Más de 10 años de experiencia en la industria de mudanzas en el este de Alemania. Nuestro equipo está formado por profesionales calificados con certificaciones.' :
                     'Over 10 years of experience in the moving industry in Eastern Germany. Our team consists of qualified specialists with certifications.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-moving-dark mb-2">
                    {language === 'pl' ? 'Bezpieczeństwo i ubezpieczenie' :
                     language === 'de' ? 'Sicherheit und Versicherung' :
                     language === 'es' ? 'Seguridad y seguro' :
                     'Safety and Insurance'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {language === 'pl' ? 
                      'Pełne ubezpieczenie wszystkich przewożonych rzeczy. Używamy najnowocześniejszych materiałów ochronnych i sprzętu.' :
                     language === 'de' ? 
                      'Vollständige Versicherung aller transportierten Gegenstände. Wir verwenden modernste Schutzmaterialien und Ausrüstung.' :
                     language === 'es' ? 
                      'Seguro completo de todos los artículos transportados. Utilizamos los materiales protectores y equipamiento más modernos.' :
                     'Complete insurance of all transported items. We use the most modern protective materials and equipment.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-moving-dark mb-2">
                    {language === 'pl' ? 'Obsługa klienta 24/7' :
                     language === 'de' ? '24/7 Kundenservice' :
                     language === 'es' ? 'Servicio al cliente 24/7' :
                     '24/7 Customer Service'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {language === 'pl' ? 
                      'Całodobowe wsparcie klienta w języku polskim, niemieckim, angielskim i hiszpańskim. Jesteśmy dostępni przez całą dobę.' :
                     language === 'de' ? 
                      'Rund-um-die-Uhr-Kundenservice auf Polnisch, Deutsch, Englisch und Spanisch. Wir sind rund um die Uhr erreichbar.' :
                     language === 'es' ? 
                      'Servicio al cliente las 24 horas en polaco, alemán, inglés y español. Estamos disponibles las 24 horas.' :
                     'Round-the-clock customer service in Polish, German, English, and Spanish. We are available 24 hours a day.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-moving-dark mb-2">
                    {language === 'pl' ? 'Konkurencyjne ceny' :
                     language === 'de' ? 'Wettbewerbsfähige Preise' :
                     language === 'es' ? 'Precios competitivos' :
                     'Competitive Prices'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {language === 'pl' ? 
                      'Transparentne ceny bez ukrytych kosztów. Oferujemy bezpłatne wyceny i indywidualne rabaty dla stałych klientów.' :
                     language === 'de' ? 
                      'Transparente Preise ohne versteckte Kosten. Wir bieten kostenlose Angebote und individuelle Rabatte für Stammkunden.' :
                     language === 'es' ? 
                      'Precios transparentes sin costos ocultos. Ofrecemos presupuestos gratuitos y descuentos individuales para clientes regulares.' :
                     'Transparent prices without hidden costs. We offer free quotes and individual discounts for regular customers.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose max-w-none text-center">
              <h3 className="text-xl font-bold text-moving-dark mb-4">
                {language === 'pl' ? 'Skontaktuj się z nami' :
                 language === 'de' ? 'Kontaktieren Sie uns' :
                 language === 'es' ? 'Contáctenos' :
                 'Contact Us'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'pl' ? 
                  'Skontaktuj się z nami, aby uzyskać bezpłatną wycenę i dowiedzieć się więcej o naszych usługach przeprowadzkowych. Nasz doświadczony zespół jest gotowy, aby pomóc Ci w każdej fazie procesu przeprowadzkowego.' :
                 language === 'de' ? 
                  'Kontaktieren Sie uns für ein kostenloses Angebot und erfahren Sie mehr über unsere Umzugsdienste. Unser erfahrenes Team ist bereit, Ihnen in jeder Phase des Umzugsprozesses zu helfen.' :
                 language === 'es' ? 
                  'Contáctenos para obtener un presupuesto gratuito y conocer más sobre nuestros servicios de mudanza. Nuestro experimentado equipo está listo para ayudarle en cada fase del proceso de mudanza.' :
                 'Contact us for a free quote and learn more about our moving services. Our experienced team is ready to help you in every phase of the moving process.'}
              </p>
              <p className="text-gray-600 mb-6">
                {language === 'pl' ? 
                  'Działamy we wschodnich Niemczech i oferujemy usługi w języku polskim, niemieckim, angielskim i hiszpańskim.' :
                 language === 'de' ? 
                  'Wir sind in Ostdeutschland tätig und bieten Dienstleistungen auf Polnisch, Deutsch, Englisch und Spanisch.' :
                 language === 'es' ? 
                  'Operamos en el este de Alemania y ofrecemos servicios en polaco, alemán, inglés y español.' :
                 'We operate in Eastern Germany and offer services in Polish, German, English, and Spanish.'}
              </p>
              
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="bg-moving-blue hover:bg-moving-darkblue text-white px-8 py-3 text-lg font-semibold"
                  onClick={() => window.open('tel:+4915223031473', '_self')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {language === 'pl' ? 'Zadzwoń teraz' :
                   language === 'de' ? 'Jetzt anrufen' :
                   language === 'es' ? 'Llamar ahora' :
                   'Call Now'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

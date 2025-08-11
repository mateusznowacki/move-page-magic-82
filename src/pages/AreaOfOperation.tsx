
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Globe, MapPin, Route, Signpost } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
const Map = React.lazy(() => import('@/components/Map'));

const AreaOfOperation: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow">
        {/* Hero Section */}
        <section className="bg-moving-gray py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {language === 'en' && "Our Areas of Operation"}
              {language === 'pl' && "Nasze obszary działania"}
              {language === 'de' && "Unsere Einsatzgebiete"}
              {language === 'es' && "Nuestras áreas de operación"}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              {language === 'en' && "We provide professional moving services across Berlin and throughout Germany. Check our coverage areas below."}
              {language === 'pl' && "Świadczymy profesjonalne usługi przeprowadzkowe w Berlinie i całych Niemczech. Sprawdź nasze obszary działania poniżej."}
              {language === 'de' && "Wir bieten professionelle Umzugsdienste in Berlin und ganz Deutschland an. Prüfen Sie unten unsere Abdeckungsbereiche."}
              {language === 'es' && "Ofrecemos servicios profesionales de mudanza en Berlín y en toda Alemania. Consulte nuestras áreas de cobertura a continuación."}
            </p>
          </div>
        </section>

        {/* Berlin Map Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center bg-moving-lightblue p-3 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-moving-blue" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {language === 'en' && "Berlin Districts"}
                {language === 'pl' && "Dzielnice Berlina"}
                {language === 'de' && "Berliner Bezirke"}
                {language === 'es' && "Distritos de Berlín"}
              </h2>
              <p className="text-lg max-w-3xl mx-auto mb-8">
                {language === 'en' && "We provide comprehensive moving services in all Berlin districts with express options available."}
                {language === 'pl' && "Oferujemy kompleksowe usługi przeprowadzkowe we wszystkich dzielnicach Berlina z dostępnymi opcjami ekspresowymi."}
                {language === 'de' && "Wir bieten umfassende Umzugsdienste in allen Berliner Bezirken mit verfügbaren Express-Optionen an."}
                {language === 'es' && "Proporcionamos servicios de mudanza completos en todos los distritos de Berlín con opciones express disponibles."}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <React.Suspense fallback={
                <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-moving-blue mx-auto mb-2"></div>
                    <p className="text-gray-600 text-sm">
                      {language === 'en' && 'Loading map...'}
                      {language === 'pl' && 'Ładowanie mapy...'}
                      {language === 'de' && 'Karte wird geladen...'}
                      {language === 'es' && 'Cargando mapa...'}
                    </p>
                  </div>
                </div>
              }>
                <Map mapType="berlin" />
              </React.Suspense>
            </div>
          </div>
        </section>
        
        {/* German States Map Section */}
        <section className="py-16 px-4 bg-moving-lightblue">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center bg-white p-3 rounded-full mb-4">
                <Signpost className="h-8 w-8 text-moving-blue" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {language === 'en' && "German Federal States"}
                {language === 'pl' && "Niemieckie kraje związkowe"}
                {language === 'de' && "Deutsche Bundesländer"}
                {language === 'es' && "Estados federados de Alemania"}
              </h2>
              <p className="text-lg max-w-3xl mx-auto mb-8">
                {language === 'en' && "Our long-distance moving services cover all German federal states with guaranteed delivery times."}
                {language === 'pl' && "Nasze usługi przeprowadzkowe na długie dystanse obejmują wszystkie niemieckie kraje związkowe z gwarantowanymi terminami dostawy."}
                {language === 'de' && "Unsere Fernumzugsdienste decken alle deutschen Bundesländer mit garantierten Lieferzeiten ab."}
                {language === 'es' && "Nuestros servicios de mudanza de larga distancia cubren todos los estados federados de Alemania con tiempos de entrega garantizados."}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <React.Suspense fallback={
                <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-moving-blue mx-auto mb-2"></div>
                    <p className="text-gray-600 text-sm">
                      {language === 'en' && 'Loading map...'}
                      {language === 'pl' && 'Ładowanie mapy...'}
                      {language === 'de' && 'Karte wird geladen...'}
                      {language === 'es' && 'Cargando mapa...'}
                    </p>
                  </div>
                </div>
              }>
                <Map mapType="germany" />
              </React.Suspense>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="contact" className="py-16 px-4 bg-moving-dark text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {language === 'en' && "Not sure if we serve your area?"}
              {language === 'pl' && "Nie jesteś pewien, czy obsługujemy Twój obszar?"}
              {language === 'de' && "Nicht sicher, ob wir Ihr Gebiet bedienen?"}
              {language === 'es' && "¿No está seguro si atendemos su área?"}
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              {language === 'en' && "Contact our team for personalized information about services in your location. We're constantly expanding our coverage areas."}
              {language === 'pl' && "Skontaktuj się z naszym zespołem, aby uzyskać spersonalizowane informacje o usługach w Twojej lokalizacji. Stale poszerzamy nasze obszary działania."}
              {language === 'de' && "Kontaktieren Sie unser Team für personalisierte Informationen zu Dienstleistungen an Ihrem Standort. Wir erweitern ständig unsere Abdeckungsgebiete."}
              {language === 'es' && "Contacte a nuestro equipo para obtener información personalizada sobre los servicios en su ubicación. Estamos expandiendo constantemente nuestras áreas de cobertura."}
            </p>
            <Button className="btn-primary" onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              {language === 'en' && "Contact Us"}
              {language === 'pl' && "Kontakt"}
              {language === 'de' && "Kontaktiere uns"}
              {language === 'es' && "Contáctenos"}
            </Button>
          </div>
        </section>
      </div>
      <Footer />
      <WhatsAppButton phoneNumber="4915223031473" />
      <ScrollToTop />
    </div>
  );
};

export default AreaOfOperation;

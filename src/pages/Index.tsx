
import React, { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Hero from '@/components/Hero';
import Services from '@/components/Services';

// Lazy load components below the fold
const About = lazy(() => import('@/components/About'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const Contact = lazy(() => import('@/components/Contact'));
const AreasSection = lazy(() => import('@/components/AreasSection'));

const Index: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const getSEOData = () => {
    const seoData = {
      pl: {
        title: "Meister Umzüge 24 - Profesjonalne Usługi Przeprowadzkowe | Berlin i Wschodnie Niemcy",
        description: "Profesjonalne usługi przeprowadzkowe w Berlinie i wschodnich Niemczech. Mieszkaniowe, biurowe i międzynarodowe przeprowadzki z pełnym ubezpieczeniem. Bezpłatna wycena!",
        keywords: "przeprowadzki Berlin, usługi przeprowadzkowe Niemcy, przeprowadzki międzynarodowe, transport mebli, pakowanie, umzug, wschodnie Niemcy"
      },
      de: {
        title: "Meister Umzüge 24 - Professionelle Umzugsdienste | Berlin und Ostdeutschland",
        description: "Professionelle Umzugsdienste in Berlin und Ostdeutschland. Wohnungs-, Büro- und internationale Umzüge mit vollständiger Versicherung. Kostenloses Angebot!",
        keywords: "Umzug Berlin, Umzugsdienste Deutschland, internationale Umzüge, Möbeltransport, Verpackung, Ostdeutschland"
      },
      es: {
        title: "Meister Umzüge 24 - Servicios Profesionales de Mudanza | Berlín y Este de Alemania",
        description: "Servicios profesionales de mudanza en Berlín y el este de Alemania. Mudanzas residenciales, comerciales e internacionales con seguro completo. ¡Presupuesto gratuito!",
        keywords: "mudanzas Berlín, servicios de mudanza Alemania, mudanzas internacionales, transporte de muebles, empaquetado, este de Alemania"
      },
      en: {
        title: "Meister Umzüge 24 - Professional Moving Services | Berlin and Eastern Germany",
        description: "Professional moving services in Berlin and Eastern Germany. Residential, commercial and international moves with full insurance. Free quote!",
        keywords: "moving Berlin, moving services Germany, international moves, furniture transport, packing, Eastern Germany"
      }
    };
    return seoData[language as keyof typeof seoData] || seoData.en;
  };

  const seoData = getSEOData();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "name": "Meister Umzüge 24",
    "description": seoData.description,
    "url": "https://meisterumzuege24.de",
    "telephone": "+49-152-230-314-73",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kolonnenstr. 8",
      "addressLocality": "Berlin",
      "postalCode": "10827",
      "addressCountry": "DE"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Berlin"
      },
      {
        "@type": "Country",
        "name": "Germany"
      }
    ],
    "serviceType": [
      "Residential Moving",
      "Commercial Moving",
      "International Moving",
      "Packing Services"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.9,
      "reviewCount": 567
    }
  };

  return (
    <>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical="/"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-white">
        <Hero />
        <div className="bg-slate-50">
          <Services />
        </div>
        <Suspense fallback={<div className="h-32 bg-gray-50 animate-pulse"></div>}>
          <About />
        </Suspense>
        <div className="bg-slate-100">
          <Suspense fallback={<div className="h-32 bg-slate-100 animate-pulse"></div>}>
            <Testimonials />
          </Suspense>
        </div>
        <div className="bg-slate-50">
          <Suspense fallback={<div className="h-32 bg-slate-50 animate-pulse"></div>}>
            <AreasSection />
          </Suspense>
        </div>
        <Suspense fallback={<div className="h-32 bg-gray-50 animate-pulse"></div>}>
          <Contact />
        </Suspense>
      </div>
    </>
  );
};

export default Index;

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  structuredData?: object;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  structuredData,
      ogImage = '/optimized/meister-umzunge-logo.webp',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
}) => {
  const siteUrl = 'https://meisterumzuege24.de';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Meister Umzüge 24" />
      <meta property="og:locale" content="de_DE" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@meisterumzuege24" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Meister Umzüge 24" />
      <meta name="language" content="de" />
      <meta name="geo.region" content="DE" />
      <meta name="geo.placename" content="Berlin" />
      <meta name="geo.position" content="52.5200;13.4050" />
      <meta name="ICBM" content="52.5200, 13.4050" />
      
      {/* Business Information */}
      <meta name="business:contact_data:street_address" content="Kolonnenstr. 8" />
      <meta name="business:contact_data:locality" content="Berlin" />
      <meta name="business:contact_data:postal_code" content="10827" />
      <meta name="business:contact_data:country_name" content="Germany" />
      <meta name="business:contact_data:phone_number" content="+49 152 230 314 73" />
      <meta name="business:contact_data:email" content="info@meisterumzuege24.de" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Default Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MovingCompany",
          "name": "Meister Umzüge 24",
          "alternateName": "MP Transporte und Umzüge",
          "description": "Profesjonalne usługi przeprowadzkowe w Niemczech. Specjalizujemy się w przeprowadzkach w całych Niemczech Wschodnich.",
          "url": "https://meisterumzuege24.de",
          "logo": "https://meisterumzuege24.de/optimized/meister-umzunge-logo.webp",
          "image": "https://meisterumzuege24.de/optimized/movecompany-in-action.webp",
          "telephone": "+49 152 230 314 73",
          "email": "info@meisterumzuege24.de",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kolonnenstr. 8",
            "addressLocality": "Berlin",
            "postalCode": "10827",
            "addressCountry": "DE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 52.5200,
            "longitude": 13.4050
          },
          "openingHours": [
            "Mo-Fr 08:00-18:00",
            "Sa 09:00-16:00"
          ],
          "priceRange": "€€",
          "areaServed": [
            "Berlin",
            "Brandenburg",
            "Sachsen",
            "Sachsen-Anhalt",
            "Thüringen",
            "Mecklenburg-Vorpommern"
          ],
          "serviceType": [
            "Residential Moving",
            "Commercial Moving",
            "International Moving",
            "Long Distance Moving"
          ],
          "sameAs": [
            "https://www.facebook.com/meisterumzuege24",
            "https://www.instagram.com/meisterumzuege24"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead; 

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Earth, Truck, Package, Building2, Globe, Shield } from 'lucide-react';

const ServiceCard = React.memo(({ service }: { service: any }) => {
  const isInternational = service.id === 12;
  
  return (
    <article 
      className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 service-card ${
        isInternational ? 'border-2 border-blue-500 relative overflow-hidden' : ''
      }`}
      itemScope
      itemType="https://schema.org/Service"
    >
      {isInternational && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-500 text-white px-3 py-1 transform rotate-45 translate-x-2 -translate-y-1">
            {service.title.includes("International") ? "New" : 
             service.title.includes("międzynarodowe") ? "Nowość" :
             service.title.includes("Internationale") ? "Neu" : "Nuevo"}
          </div>
        </div>
      )}
      <div className="text-moving-blue mb-4" role="img" aria-label={`Ikona usługi: ${service.title}`}>
        {isInternational ? (
          <Earth size={40} className="text-moving-blue" />
        ) : (
          <Truck size={40} className="text-moving-blue" />
        )}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-moving-dark" itemProp="name">{service.title}</h3>
      <p className="text-gray-600" itemProp="description">{service.description}</p>
    </article>
  );
});

ServiceCard.displayName = 'ServiceCard';

const Services: React.FC = () => {
  const { t, getServiceData } = useLanguage();
  const servicesData = getServiceData();

  return (
    <section id="services" className="section-padding bg-moving-gray" role="main" aria-labelledby="services-heading">
      <div className="container">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="services-heading" className="section-subtitle text-xl sm:text-2xl md:text-3xl lg:text-4xl">{t('services.title')}</h2>
          <h3 className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{t('services.subtitle')}</h3>
          <p className="text-gray-600 text-base sm:text-lg">
            {t('services.description')}
          </p>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" role="list">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

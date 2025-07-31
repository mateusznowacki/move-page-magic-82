
import React from 'react';

interface FeatureCardProps {
  feature: {
    id: number;
    title: string;
    description: string;
  };
}

const FeatureCard = React.memo(({ feature }: FeatureCardProps) => {
  return (
    <article className="flex" itemScope itemType="https://schema.org/Service">
      <div className="mr-4 bg-moving-lightblue p-2 rounded-full h-max mt-1" role="img" aria-label="Ikona checkmark">
        <svg className="w-4 h-4 text-moving-blue" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
        </svg>
      </div>
      <div>
        <h4 className="font-medium text-moving-dark mb-1" itemProp="name">{feature.title}</h4>
        <p className="text-gray-600 text-sm" itemProp="description">{feature.description}</p>
      </div>
    </article>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;

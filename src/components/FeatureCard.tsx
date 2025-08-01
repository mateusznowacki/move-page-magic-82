
import React from 'react';

interface FeatureCardProps {
  feature: {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <article 
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 feature-card"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="flex items-start">
        <div className="mr-4 bg-moving-lightblue p-2 rounded-full h-max mt-1" role="img" aria-label="Ikona checkmark">
          {feature.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-moving-dark" itemProp="name">{feature.title}</h3>
          <p className="text-gray-700 text-sm" itemProp="description">{feature.description}</p>
        </div>
      </div>
    </article>
  );
};

export default FeatureCard;

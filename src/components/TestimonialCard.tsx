
import React from 'react';

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    quote: string;
    rating: number;
    image: string;
  };
}

const TestimonialCard = React.memo(({ testimonial }: TestimonialCardProps) => {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
        role="img"
        aria-label={i < rating ? "Pełna gwiazdka" : "Pusta gwiazdka"}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    ));
  };

  return (
    <article 
      className="bg-white rounded-lg p-6 shadow-sm testimonial-card"
      itemScope
      itemType="https://schema.org/Review"
    >
      <div className="flex items-center mb-4" role="img" aria-label={`Ocena ${testimonial.rating} z 5 gwiazdek`}>
        {renderStars(testimonial.rating)}
        <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
      </div>
      <blockquote className="text-slate-600 mb-6 italic" itemProp="reviewBody">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center">
        <img 
          src={testimonial.image} 
          alt={`Zdjęcie ${testimonial.name} - klienta Umzuge Meister`}
          className="w-12 h-12 rounded-full mr-4 object-cover"
          loading="lazy"
          width="48"
          height="48"
        />
        <div itemScope itemType="https://schema.org/Person">
          <h4 className="font-medium text-slate-800" itemProp="name">{testimonial.name}</h4>
          <p className="text-sm text-slate-600" itemProp="jobTitle">{testimonial.role}</p>
        </div>
      </div>
      <meta itemProp="author" content={testimonial.name} />
      <meta itemProp="itemReviewed" content="Meister Umzüge 24" />
    </article>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;

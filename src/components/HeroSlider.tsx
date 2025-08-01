
import React, { useState, useEffect } from 'react';

const sliderImages = [
  {
    url: "/optimized/hero-image-1.webp",
    alt: "Moving services"
  },
  {
    url: "/optimized/hero-image-2.webp", 
    alt: "Professional movers loading a truck" 
  },
  {
    url: "/optimized/hero-image-3.webp",
    alt: "Home relocation"
  }
];

const HeroSlider = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleImageError = () => {
    console.error('Hero image failed to load');
    setImageError(true);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
      <div className="h-full w-full">
        {sliderImages.map((image, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image.url} 
              alt={image.alt} 
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
              onError={handleImageError}
            />
          </div>
        ))}
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-moving-blue to-moving-darkblue"></div>
        )}
      </div>
    </div>
  );
});

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;

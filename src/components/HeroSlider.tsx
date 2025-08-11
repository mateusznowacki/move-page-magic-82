
import React from 'react';

const HeroSlider = React.memo(() => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40 z-10"></div>
      <div className="h-full w-full">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          poster="/optimized/hero-image-1.webp"
        >
          <source src="/meisterumzuge24-movie.mp4" type="video/mp4" />
          {/* Fallback dla przeglądarek, które nie obsługują video */}
          <img 
            src="/optimized/hero-image-1.webp" 
            alt="Moving services" 
            className="w-full h-full object-cover"
          />
        </video>
      </div>
    </div>
  );
});

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;


import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";

const sliderImages = [
  {
    url: "/hero-image-1.jpg",
    alt: "Moving services"
  },
  {
    url: "/hero-image-2.jpg", 
    alt: "Professional movers loading a truck" 
  },
  {
    url: "/hero-image-3.jpg",
    alt: "Home relocation"
  }
];

const HeroSlider = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleImageError = () => {
    console.error('Hero image failed to load');
    setImageError(true);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
      <Carousel className="h-full" 
        opts={{
          align: "start",
          loop: true,
        }}
        orientation="horizontal"
        setApi={(api) => {
          if (api) {
            api.scrollTo(currentSlide);
          }
        }}
      >
        <CarouselContent className="h-full">
          {sliderImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                onError={handleImageError}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex left-4 z-20" />
        <CarouselNext className="hidden sm:flex right-4 z-20" />
      </Carousel>
    </div>
  );
});

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;

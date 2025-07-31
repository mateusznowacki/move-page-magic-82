
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLanguage } from '@/contexts/LanguageContext';

interface MapProps {
  mapType: 'berlin' | 'germany';
}

const Map: React.FC<MapProps> = ({ mapType }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { language } = useLanguage();
  
  // Mapbox access token
  const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFrc3lta2luZyIsImEiOiJjbWJmYzczdHQyY2F1MmtwOWNwbmN2YjgxIn0.UsA0RBJN94VJmw14MGB5jg';
  
  // Define center points and zoom levels for each map type
  const mapSettings = {
    berlin: {
      center: [13.405, 52.52] as [number, number],
      zoom: 10,
      title: {
        en: 'Berlin Districts',
        pl: 'Dzielnice Berlina',
        de: 'Berliner Bezirke',
        es: 'Distritos de Berlín'
      }
    },
    germany: {
      center: [10.4515, 51.1657] as [number, number],
      zoom: 5.5,
      title: {
        en: 'German Federal States',
        pl: 'Niemieckie kraje związkowe',
        de: 'Deutsche Bundesländer',
        es: 'Estados federados de Alemania'
      }
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Destroy previous map instance if it exists
    if (map.current) {
      map.current.remove();
    }

    try {
      // Initialize map
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      const settings = mapSettings[mapType];
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: settings.center,
        zoom: settings.zoom,
        interactive: true
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Clean up on unmount
      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [mapType]);

  const currentTitle = mapSettings[mapType].title[language as keyof typeof mapSettings.berlin.title] || 
                      mapSettings[mapType].title.en;

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-xl font-semibold mb-3">{currentTitle}</h3>
      
      <div 
        ref={mapContainer} 
        className="w-full h-[400px] rounded-lg shadow-lg"
      />
    </div>
  );
};

export default Map;

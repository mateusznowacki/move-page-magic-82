
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MapProps {
  mapType: 'berlin' | 'germany';
}

const Map: React.FC<MapProps> = ({ mapType }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [mapboxLoaded, setMapboxLoaded] = React.useState(false);
  const { language } = useLanguage();
  
  // Mapbox access token
  const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFrc3lta2luZyIsImEiOiJjbWJmYzczdHQyY2F1MmtwOWNwbmN2YjgxIn0.UsA0RBJN94VJmw14MGB5jg';
  
  // Company location coordinates (Kolonnenstr. 8, 10827 Berlin)
  const COMPANY_LOCATION = [13.405, 52.52] as [number, number];
  
  // Define center points and zoom levels for each map type
  const mapSettings = {
    berlin: {
      center: COMPANY_LOCATION,
      zoom: 12,
      title: {
        en: 'Berlin Districts',
        pl: 'Dzielnice Berlina',
        de: 'Berliner Bezirke',
        es: 'Distritos de Berlín'
      }
    },
    germany: {
      center: [10.5, 51.5] as [number, number],
      zoom: 6,
      title: {
        en: 'German Federal States',
        pl: 'Niemieckie kraje związkowe',
        de: 'Deutsche Bundesländer',
        es: 'Estados federados de Alemania'
      }
    }
  };

  // Load Mapbox GL JS dynamically
  useEffect(() => {
    const loadMapbox = async () => {
      try {
        const mapboxgl = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');
        setMapboxLoaded(true);
      } catch (error) {
        console.error('Error loading Mapbox:', error);
      }
    };

    loadMapbox();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxLoaded) return;

    const initializeMap = async () => {
      try {
        const mapboxgl = await import('mapbox-gl');
        
        // Destroy previous map instance if it exists
        if (map.current) {
          try {
            map.current.remove();
          } catch (error) {
            console.warn('Error removing previous map:', error);
          }
          map.current = null;
        }

        // Initialize map
        mapboxgl.default.accessToken = MAPBOX_TOKEN;
        
        const settings = mapSettings[mapType];
        
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: settings.center,
          zoom: settings.zoom,
          interactive: false,
          attributionControl: false,
          logoPosition: 'bottom-left'
        });

        // Add company location marker
        map.current.on('load', () => {
          setIsLoading(false);
          if (map.current) {
            // Create a custom marker element
            const markerEl = document.createElement('div');
            markerEl.className = 'company-marker';
            markerEl.style.width = '30px';
            markerEl.style.height = '30px';
            markerEl.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23ef4444\'%3E%3Cpath d=\'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\'/%3E%3C/svg%3E")';
            markerEl.style.backgroundSize = 'contain';
            markerEl.style.backgroundRepeat = 'no-repeat';
            markerEl.style.cursor = 'pointer';

            // Add marker to map
            new mapboxgl.default.Marker(markerEl)
              .setLngLat(COMPANY_LOCATION)
              .setPopup(
                new mapboxgl.default.Popup({ offset: 25 })
                  .setHTML(`
                    <div class="p-2">
                      <h3 class="font-bold text-lg">Meister Umzüge</h3>
                      <p class="text-sm text-gray-600">Kolonnenstr. 8, 10827 Berlin</p>
                    </div>
                  `)
              )
              .addTo(map.current);

            // Load GeoJSON data and add layers based on map type
            if (mapType === 'berlin') {
              // Load the GeoJSON data to get exact Berlin boundaries
              fetch('/germany-states-low.geojson')
                .then(response => response.json())
                .then(data => {
                  if (map.current) {
                    // Find Berlin feature in GeoJSON
                    const berlinFeature = data.features.find((f: any) => f.properties.name === 'Berlin');
                    if (berlinFeature) {
                      // Add Berlin boundary highlight
                      const berlinData: any = {
                        type: 'FeatureCollection',
                        features: [berlinFeature]
                      };

                      map.current.addSource('berlin-boundary', {
                        type: 'geojson',
                        data: berlinData
                      });

                      map.current.addLayer({
                        id: 'berlin-boundary-fill',
                        type: 'fill',
                        source: 'berlin-boundary',
                        paint: {
                          'fill-color': '#4882c9',
                          'fill-opacity': 0.4
                        }
                      });

                      map.current.addLayer({
                        id: 'berlin-boundary-border',
                        type: 'line',
                        source: 'berlin-boundary',
                        paint: {
                          'line-color': '#1d4ed8',
                          'line-width': 3
                        }
                      });

                      // Create bounds from Berlin's actual coordinates
                      const bounds = new mapboxgl.default.LngLatBounds();
                      berlinFeature.geometry.coordinates[0].forEach((coord: number[]) => {
                        bounds.extend(coord as [number, number]);
                      });
                      
                      // Fit map to Berlin bounds
                      map.current.fitBounds(bounds, {
                        padding: 20,
                        maxZoom: 12
                      });
                    }
                  }
                })
                .catch(error => {
                  console.error('Error loading GeoJSON data:', error);
                });
            } else if (mapType === 'germany') {
              // Load GeoJSON data for all German states
              fetch('/germany-states-low.geojson')
                .then(response => response.json())
                .then(data => {
                  if (map.current) {
                    const allStates = data.features;

                    // Add source for all states
                    map.current.addSource('germany-states', {
                      type: 'geojson',
                      data: data
                    });

                    // Add fill layer for all states
                    map.current.addLayer({
                      id: 'all-states-fill',
                      type: 'fill',
                      source: 'germany-states',
                      paint: {
                        'fill-color': '#4882c9',
                        'fill-opacity': 0.1
                      }
                    });

                    // Add border layer for all states
                    map.current.addLayer({
                      id: 'all-states-border',
                      type: 'line',
                      source: 'germany-states',
                      paint: {
                        'line-color': '#4882c9',
                        'line-width': 1
                      }
                    });

                    // Add Berlin boundary highlight for germany map too
                    const berlinFeature = data.features.find((f: any) => f.properties.name === 'Berlin');
                    if (berlinFeature) {
                      const berlinData: any = {
                        type: 'FeatureCollection',
                        features: [berlinFeature]
                      };

                      map.current.addSource('berlin-boundary', {
                        type: 'geojson',
                        data: berlinData
                      });

                      map.current.addLayer({
                        id: 'berlin-boundary-fill',
                        type: 'fill',
                        source: 'berlin-boundary',
                        paint: {
                          'fill-color': '#4882c9',
                          'fill-opacity': 0.4
                        }
                      });

                      map.current.addLayer({
                        id: 'berlin-boundary-border',
                        type: 'line',
                        source: 'berlin-boundary',
                        paint: {
                          'line-color': '#1d4ed8',
                          'line-width': 3
                        }
                      });
                    }

                    // Fit map to show all of Germany
                    const bounds = new mapboxgl.default.LngLatBounds();
                    allStates.forEach((feature: any) => {
                      if (feature.geometry.type === 'Polygon') {
                        feature.geometry.coordinates[0].forEach((coord: number[]) => {
                          bounds.extend(coord as [number, number]);
                        });
                      } else if (feature.geometry.type === 'MultiPolygon') {
                        feature.geometry.coordinates.forEach((polygon: number[][][]) => {
                          polygon[0].forEach((coord: number[]) => {
                            bounds.extend(coord as [number, number]);
                          });
                        });
                      }
                    });
                    
                    map.current.fitBounds(bounds, {
                      padding: 50,
                      maxZoom: 7
                    });
                  }
                })
                .catch(error => {
                  console.error('Error loading GeoJSON data:', error);
                });
            }
          }
        });

        // Clean up on unmount
        return () => {
          if (map.current) {
            try {
              map.current.remove();
            } catch (error) {
              console.warn('Error removing map:', error);
            }
            map.current = null;
          }
        };
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();
  }, [mapType, mapboxLoaded]);

  const currentTitle = mapSettings[mapType].title[language as keyof typeof mapSettings.berlin.title] || 
                      mapSettings[mapType].title.en;

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full h-[400px] rounded-lg shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-moving-blue mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Ładowanie mapy...</p>
            </div>
          </div>
        )}
      <div 
        ref={mapContainer} 
          className="w-full h-full rounded-lg"
      />
      </div>
    </div>
  );
};

export default Map;

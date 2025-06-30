import { useState, useCallback } from 'react';
import { openInGoogleMaps, isCitySupported, getCityCoordinates } from '@/utils/maps';

/**
 * Hook personalizado para manejar la funcionalidad de Google Maps
 */
export function useGoogleMaps() {
  const [isLoading, setIsLoading] = useState(false);

  const openLocation = useCallback(async (city: string, propertyTitle: string) => {
    setIsLoading(true);
    
    try {
      // Pequeño delay para mostrar el estado de carga
      await new Promise(resolve => setTimeout(resolve, 300));
      
      openInGoogleMaps(city, propertyTitle);
    } catch (error) {
      console.error('Error al abrir Google Maps:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getLocationInfo = useCallback((city: string) => {
    const isSupported = isCitySupported(city);
    const coordinates = getCityCoordinates(city);
    
    return {
      isSupported,
      coordinates,
      description: isSupported 
        ? `Ubicación aproximada en el centro de ${city}`
        : `Búsqueda de propiedades en ${city}, Argentina`
    };
  }, []);

  return {
    openLocation,
    getLocationInfo,
    isLoading
  };
}

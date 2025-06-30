/**
 * Utilidades para integración con Google Maps
 */

import { normalizeTextForSearch } from './formatters';

// Coordenadas del centro aproximado de cada provincia/ciudad argentina
export const COORDINATES_MAP: Record<string, { lat: number; lng: number; displayName: string }> = {
  'Buenos Aires': {
    lat: -34.6037,
    lng: -58.3816,
    displayName: 'Buenos Aires, Argentina'
  },
  'CABA': {
    lat: -34.6037,
    lng: -58.3816,
    displayName: 'Ciudad Autónoma de Buenos Aires, Argentina'
  },
  'Córdoba': {
    lat: -31.4201,
    lng: -64.1888,
    displayName: 'Córdoba, Argentina'
  },
  'La Plata': {
    lat: -34.9215,
    lng: -57.9545,
    displayName: 'La Plata, Buenos Aires, Argentina'
  },
  'Rosario': {
    lat: -32.9442,
    lng: -60.6505,
    displayName: 'Rosario, Santa Fe, Argentina'
  },
  'Mendoza': {
    lat: -32.8895,
    lng: -68.8458,
    displayName: 'Mendoza, Argentina'
  },
  'Salta': {
    lat: -24.7859,
    lng: -65.4117,
    displayName: 'Salta, Argentina'
  },
  'Neuquén': {
    lat: -38.9516,
    lng: -68.0591,
    displayName: 'Neuquén, Argentina'
  },
  'Mar del Plata': {
    lat: -38.0055,
    lng: -57.5426,
    displayName: 'Mar del Plata, Buenos Aires, Argentina'
  }
};

/**
 * Genera una URL de Google Maps para abrir en una nueva pestaña
 * @param city Ciudad de la propiedad
 * @param propertyTitle Título de la propiedad (opcional, para búsqueda más específica)
 */
export function generateGoogleMapsURL(city: string, propertyTitle?: string): string {
  const coordinates = findCityCoordinates(city);
  
  if (!coordinates) {
    // Si no tenemos coordenadas específicas, usar búsqueda genérica
    const searchQuery = encodeURIComponent(`${propertyTitle || 'propiedades'} ${city}, Argentina`);
    return `https://www.google.com/maps/search/${searchQuery}`;
  }

  // Usar coordenadas específicas con zoom apropiado para la ciudad
  const { lat, lng } = coordinates;
  const zoom = 13; // Zoom apropiado para ver el centro de la ciudad
  
  // URL que abre Google Maps centrado en la ubicación
  return `https://www.google.com/maps/@${lat},${lng},${zoom}z`;
}

/**
 * Genera una URL de Google Maps con marcador en la ubicación
 * @param city Ciudad de la propiedad
 * @param propertyTitle Título de la propiedad
 */
export function generateGoogleMapsMarkerURL(city: string, propertyTitle: string): string {
  const coordinates = findCityCoordinates(city);
  
  if (!coordinates) {
    // Fallback a búsqueda
    const searchQuery = encodeURIComponent(`${propertyTitle} ${city}, Argentina`);
    return `https://www.google.com/maps/search/${searchQuery}`;
  }

  const { lat, lng } = coordinates;
  
  // URL que abre Google Maps con un marcador
  return `https://www.google.com/maps/place/${coordinates.displayName}/@${lat},${lng},15z`;
}

/**
 * Abre Google Maps en una nueva pestaña
 * @param city Ciudad de la propiedad
 * @param propertyTitle Título de la propiedad
 */
export function openInGoogleMaps(city: string, propertyTitle: string): void {
  const url = generateGoogleMapsMarkerURL(city, propertyTitle);
  
  try {
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (error) {
    // Fallback: copiar URL al clipboard si no se puede abrir
    console.warn('No se pudo abrir Google Maps:', error);
    
    // Intentar copiar al clipboard como fallback
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        alert('La URL de Google Maps ha sido copiada al portapapeles.');
      }).catch(() => {
        alert(`Por favor, visita manualmente: ${url}`);
      });
    } else {
      alert(`Por favor, visita manualmente: ${url}`);
    }
  }
}

/**
 * Obtiene las coordenadas de una ciudad si están disponibles
 * @param city Ciudad a buscar
 */
export function getCityCoordinates(city: string): { lat: number; lng: number } | null {
  const coordinates = findCityCoordinates(city);
  return coordinates ? { lat: coordinates.lat, lng: coordinates.lng } : null;
}

/**
 * Verifica si una ciudad tiene coordenadas disponibles
 * @param city Ciudad a verificar
 */
export function isCitySupported(city: string): boolean {
  return findCityCoordinates(city) !== null;
}

/**
 * Busca una ciudad en el mapa de coordenadas, considerando variaciones con y sin acentos
 * @param city Ciudad a buscar
 * @returns Coordenadas de la ciudad si se encuentra
 */
function findCityCoordinates(city: string): { lat: number; lng: number; displayName: string } | null {
  // Buscar primero la coincidencia exacta
  if (COORDINATES_MAP[city]) {
    return COORDINATES_MAP[city];
  }
  
  // Si no encuentra, buscar por texto normalizado (sin acentos)
  const normalizedSearchCity = normalizeTextForSearch(city);
  
  for (const [mapCity, coordinates] of Object.entries(COORDINATES_MAP)) {
    if (normalizeTextForSearch(mapCity) === normalizedSearchCity) {
      return coordinates;
    }
  }
  
  return null;
}

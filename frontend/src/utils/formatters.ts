/**
 * Utilidades para formatear datos en la aplicación
 */

/**
 * Formatea un precio en pesos argentinos
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

/**
 * Formatea metros cuadrados
 */
export const formatArea = (area: number): string => {
  return `${area} m²`;
};

/**
 * Formatea el número de ambientes
 */
export const formatRooms = (rooms: number): string => {
  return rooms === 1 ? '1 ambiente' : `${rooms} ambientes`;
};

/**
 * Obtiene el color de score de similitud
 */
export const getSimilarityColor = (score: number): string => {
  if (score >= 80) return 'text-green-600 bg-green-50';
  if (score >= 60) return 'text-blue-600 bg-blue-50';
  if (score >= 40) return 'text-yellow-600 bg-yellow-50';
  return 'text-gray-600 bg-gray-50';
};

/**
 * Trunca un texto a cierta longitud
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Genera un slug amigable para URLs
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[áàäâã]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöôõ]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * Normaliza texto para búsqueda eliminando acentos, ñ y caracteres especiales
 * Útil para hacer búsquedas que ignoren acentos y tildes
 */
export const normalizeTextForSearch = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD') // Descompone caracteres con acentos
    .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos (acentos)
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s]/g, '') // Elimina caracteres especiales excepto espacios
    .trim();
};

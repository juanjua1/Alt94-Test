/**
 * Tipos de datos para la aplicación de propiedades inmobiliarias
 */

export interface Property {
  id: number;
  titulo: string;
  ciudad: string;
  tipo: string;
  precio: number;
  ambientes: number;
  metros_cuadrados: number;
  imagen: string;
}

export interface PropertyFilters {
  ciudad?: string;
  tipo?: string;
  precioMin?: number;
  precioMax?: number;
  ambientesMin?: number;
  ambientesMax?: number;
}

export interface SimilarityScore {
  property: Property;
  score: number;
  reasons: string[];
}

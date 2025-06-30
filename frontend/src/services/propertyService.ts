import { Property, PropertyFilters, SimilarityScore } from '@/types/property';
import { propertiesData } from '@/data/properties';
import { normalizeTextForSearch } from '@/utils/formatters';

export class PropertyService {
  private properties: Property[] = propertiesData;

  getAllProperties(): Property[] {
    return this.properties;
  }

  getPropertyById(id: number): Property | undefined {
    return this.properties.find(property => property.id === id);
  }

  filterProperties(filters: PropertyFilters): Property[] {
    return this.properties.filter(property => {
      if (filters.ciudad && property.ciudad !== filters.ciudad) return false;
      if (filters.tipo && property.tipo !== filters.tipo) return false;
      if (filters.precioMin && property.precio < filters.precioMin) return false;
      if (filters.precioMax && property.precio > filters.precioMax) return false;
      if (filters.ambientesMin && property.ambientes < filters.ambientesMin) return false;
      if (filters.ambientesMax && property.ambientes > filters.ambientesMax) return false;
      return true;
    });
  }

  getFilterOptions() {
    const ciudades = [...new Set(this.properties.map(p => p.ciudad))].sort();
    const tipos = [...new Set(this.properties.map(p => p.tipo))].sort();
    return { ciudades, tipos };
  }

  /**
   * Sistema de recomendaciones basado en similitud
   * Calcula similitud considerando: ciudad, tipo, precio y ambientes
   * Evita recomendaciones recíprocas
   */
  getRecommendations(targetProperty: Property, limit: number = 3, previousPropertyId?: number): SimilarityScore[] {
    const recommendations: SimilarityScore[] = [];

    for (const property of this.properties) {
      if (property.id === targetProperty.id) continue;
      
      if (previousPropertyId && property.id === previousPropertyId) continue;

      const similarityData = this.calculateSimilarity(targetProperty, property);
      
      if (similarityData.score > 0) {
        recommendations.push(similarityData);
      }
    }

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  private calculateSimilarity(target: Property, candidate: Property): SimilarityScore {
    let score = 0;
    const reasons: string[] = [];

    if (target.ciudad === candidate.ciudad) {
      score += 35;
      reasons.push(`Misma ciudad: ${target.ciudad}`);
    }

    if (target.tipo === candidate.tipo) {
      score += 30;
      reasons.push(`Mismo tipo: ${target.tipo}`);
    }

    const priceRange = target.precio * 0.2;
    const priceDiff = Math.abs(target.precio - candidate.precio);
    
    if (priceDiff <= priceRange) {
      const proximityRatio = 1 - (priceDiff / priceRange);
      const pricePoints = Math.round(proximityRatio * 25);
      score += pricePoints;
      
      const percentDiff = Math.round((priceDiff / target.precio) * 100);
      reasons.push(`Precio similar (±${percentDiff}%)`);
    }

    // 4. Ambientes similares ±1 ambiente (10 puntos)
    const ambientesDiff = Math.abs(target.ambientes - candidate.ambientes);
    if (ambientesDiff <= 1) {
      if (ambientesDiff === 0) {
        score += 10; // Puntos completos por exactitud
        reasons.push(`Misma cantidad de ambientes: ${target.ambientes}`);
      } else {
        score += 5; // Puntos parciales por similitud
        reasons.push(`Ambientes similares (${candidate.ambientes})`);
      }
    }

    // Verificación de seguridad: asegurar que nunca supere 100
    const finalScore = Math.min(100, Math.round(score));

    return {
      property: candidate,
      score: finalScore,
      reasons
    };
  }

  /**
   * Busca propiedades por texto (título o ciudad)
   * Normaliza el texto para ignorar acentos y caracteres especiales
   */
  searchProperties(searchTerm: string): Property[] {
    const normalizedTerm = normalizeTextForSearch(searchTerm);
    if (!normalizedTerm) return this.properties;

    return this.properties.filter(property => {
      const normalizedTitle = normalizeTextForSearch(property.titulo);
      const normalizedCity = normalizeTextForSearch(property.ciudad);
      const normalizedType = normalizeTextForSearch(property.tipo);
      
      return normalizedTitle.includes(normalizedTerm) ||
             normalizedCity.includes(normalizedTerm) ||
             normalizedType.includes(normalizedTerm);
    });
  }

  /**
   * Obtiene estadísticas generales de las propiedades
   */
  getStatistics() {
    const precios = this.properties.map(p => p.precio);
    const metros = this.properties.map(p => p.metros_cuadrados);

    return {
      total: this.properties.length,
      precioPromedio: Math.round(precios.reduce((a, b) => a + b, 0) / precios.length),
      precioMin: Math.min(...precios),
      precioMax: Math.max(...precios),
      metrosPromedio: Math.round(metros.reduce((a, b) => a + b, 0) / metros.length),
      porTipo: this.getCountByField('tipo'),
      porCiudad: this.getCountByField('ciudad')
    };
  }

  /**
   * Obtiene conteo de propiedades por campo específico
   */
  private getCountByField(field: keyof Property): Record<string, number> {
    return this.properties.reduce((acc, property) => {
      const value = property[field] as string;
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}

// Exportar instancia singleton
export const propertyService = new PropertyService();

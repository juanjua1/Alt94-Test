import { useState, useEffect } from 'react';
import { Property, SimilarityScore } from '@/types/property';
import { propertyService } from '@/services/propertyService';

export const useRecommendations = (
  property: Property | null, 
  limit: number = 3,
  previousPropertyId?: number
) => {
  const [recommendations, setRecommendations] = useState<SimilarityScore[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!property) {
      setRecommendations([]);
      return;
    }

    setLoading(true);
    
    try {
      const similarProperties = propertyService.getRecommendations(
        property, 
        limit, 
        previousPropertyId
      );
      setRecommendations(similarProperties);
    } catch (error) {
      console.error('Error obteniendo recomendaciones:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }, [property, limit, previousPropertyId]);

  return {
    recommendations,
    loading,
    hasRecommendations: recommendations.length > 0
  };
};

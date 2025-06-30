import React from 'react';
import { SimilarityScore } from '@/types/property';
import PropertyCard from '../properties/PropertyCard';
import Badge from '../ui/Badge';
import Loading from '../ui/Loading';
import { getSimilarityColor } from '@/utils/formatters';

interface RecommendationsProps {
  recommendations: SimilarityScore[];
  loading?: boolean;
  onPropertyClick?: (property: SimilarityScore['property']) => void;
  title?: string;
  showDebugInfo?: boolean;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
  loading = false,
  onPropertyClick,
  title = 'Propiedades similares',
  showDebugInfo = false
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <Loading text="Buscando propiedades similares..." size="sm" centered={false} />
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-gray-500 text-sm">
            No se encontraron propiedades similares
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <div key={recommendation.property.id} className="border border-gray-100 rounded-lg p-4">
            {/* Header con score y razones */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    className={getSimilarityColor(recommendation.score)}
                    size="sm"
                  >
                    {recommendation.score}% similar
                  </Badge>
                  {showDebugInfo && (
                    <Badge variant="default" size="sm">
                      ID: {recommendation.property.id}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {recommendation.reasons.map((reason, index) => (
                    <Badge key={index} variant="default" size="sm">
                      {reason}
                    </Badge>
                  ))}
                </div>
                
                {/* Debug info */}
                {showDebugInfo && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                    <div>• Ciudad: {recommendation.property.ciudad}</div>
                    <div>• Tipo: {recommendation.property.tipo}</div>
                    <div>• Precio: ${recommendation.property.precio.toLocaleString()}</div>
                    <div>• Ambientes: {recommendation.property.ambientes}</div>
                    <div>• Score calculado: {recommendation.score}/100</div>
                  </div>
                )}
              </div>
            </div>

            {/* Card de propiedad */}
            <div className="grid grid-cols-1 lg:grid-cols-1">
              <PropertyCard
                property={recommendation.property}
                onClick={onPropertyClick ? () => onPropertyClick(recommendation.property) : undefined}
                showRecommendations={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;

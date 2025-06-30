'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { propertyService } from '@/services/propertyService';
import { useRecommendations } from '@/hooks/useRecommendations';
import { useNavigation } from '@/contexts/NavigationContext';
import PropertyDetail from '@/components/properties/PropertyDetail';
import Recommendations from '@/components/recommendations/Recommendations';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Loading from '@/components/ui/Loading';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { previousPropertyId, addToHistory } = useNavigation();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    recommendations,
    loading: loadingRecommendations,
    hasRecommendations
  } = useRecommendations(property, 3, previousPropertyId || undefined);

  useEffect(() => {
    const loadProperty = () => {
      try {
        const propertyId = Number(params.id);
        if (isNaN(propertyId)) {
          setError('ID de propiedad inválido');
          setLoading(false);
          return;
        }

        const foundProperty = propertyService.getPropertyById(propertyId);
        if (!foundProperty) {
          setError('Propiedad no encontrada');
        } else {
          setProperty(foundProperty);
          // Agregar al historial de navegación
          addToHistory(foundProperty.id);
        }
      } catch (err) {
        setError('Error al cargar la propiedad');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadProperty();
    }
  }, [params.id, addToHistory]);

  const handleClose = () => {
    router.push('/');
  };

  const handleRecommendationClick = (recommendedProperty: Property) => {
    router.push(`/property/${recommendedProperty.id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Propiedad no encontrada' }
          ]} 
        />
        
        <div className="text-center py-16">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 6.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {error || 'Propiedad no encontrada'}
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            La propiedad que buscas no existe o ha sido removida.
          </p>
          
          <button
            onClick={handleClose}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        items={[
          { label: 'Inicio', href: '/' },
          { label: property.ciudad, href: `/?ciudad=${encodeURIComponent(property.ciudad)}` },
          { label: property.titulo }
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna principal - Detalle de propiedad */}
        <div className="lg:col-span-2">
          <PropertyDetail
            property={property}
            onClose={handleClose}
            showBackButton={true}
          />
        </div>

        {/* Columna lateral - Recomendaciones */}
        <div className="lg:col-span-1">
          <Recommendations
            recommendations={recommendations}
            loading={loadingRecommendations}
            onPropertyClick={handleRecommendationClick}
            title="Propiedades similares"
          />

          {/* Estadísticas adicionales */}
          {hasRecommendations && !loadingRecommendations && (
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                Sistema de recomendaciones
              </h4>
              <p className="text-sm text-blue-700">
                Las recomendaciones se basan en similitudes de ciudad, tipo de propiedad,
                rango de precio y cantidad de ambientes. El score indica el porcentaje
                de similitud con la propiedad seleccionada.
              </p>
              {previousPropertyId && (
                <p className="text-xs text-blue-600 mt-2">
                  * Se evitan recomendaciones recíprocas con la propiedad anterior
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

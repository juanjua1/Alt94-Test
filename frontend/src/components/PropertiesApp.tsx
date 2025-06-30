'use client';

import React, { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { useProperties } from '@/hooks/useProperties';
import { useRecommendations } from '@/hooks/useRecommendations';
import { usePropertiesContext } from '@/contexts/PropertiesContext';

import PropertyFilters from '@/components/properties/PropertyFilters';
import PropertyGrid from '@/components/properties/PropertyGrid';
import PropertyDetail from '@/components/properties/PropertyDetail';
import Pagination from '@/components/properties/Pagination';
import Recommendations from '@/components/recommendations/Recommendations';

const PropertiesApp: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const { setTotalProperties } = usePropertiesContext();

  const {
    properties,
    loading,
    searchTerm,
    filters,
    pagination,
    filterOptions,
    setSearchTerm,
    updateFilters,
    clearFilters,
    nextPage,
    prevPage,
    goToPage
  } = useProperties();

  useEffect(() => {
    setTotalProperties(pagination.totalItems);
  }, [pagination.totalItems, setTotalProperties]);

  const {
    recommendations,
    loading: loadingRecommendations,
    hasRecommendations
  } = useRecommendations(selectedProperty);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedProperty(null);
  };

  const handleRecommendationClick = (property: Property) => {
    setSelectedProperty(property);
  };

  return (
    <div className="min-h-screen">
      <main>
        {!showDetail ? (
          <>
            <PropertyFilters
              filters={filters}
              searchTerm={searchTerm}
              filterOptions={filterOptions}
              onFiltersChange={updateFilters}
              onSearchChange={setSearchTerm}
              onClearFilters={clearFilters}
            />

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Propiedades disponibles
                </h2>
                <div className="text-sm text-gray-500">
                  {pagination.totalItems} resultados
                </div>
              </div>
            </div>

            <PropertyGrid
              properties={properties}
              loading={loading}
              onPropertyClick={handlePropertyClick}
              emptyMessage="No se encontraron propiedades con los filtros aplicados"
            />

            {!loading && properties.length > 0 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                hasNextPage={pagination.hasNextPage}
                hasPrevPage={pagination.hasPrevPage}
                totalItems={pagination.totalItems}
                startItem={pagination.startItem}
                endItem={pagination.endItem}
                onNextPage={nextPage}
                onPrevPage={prevPage}
                onGoToPage={goToPage}
              />
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {selectedProperty && (
                <PropertyDetail
                  property={selectedProperty}
                  onClose={handleCloseDetail}
                  showBackButton={true}
                />
              )}
            </div>

            <div className="lg:col-span-1">
              {selectedProperty && (
                <Recommendations
                  recommendations={recommendations}
                  loading={loadingRecommendations}
                  onPropertyClick={handleRecommendationClick}
                  title="Propiedades similares"
                />
              )}

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
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PropertiesApp;

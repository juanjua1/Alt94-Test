import React from 'react';
import { Property } from '@/types/property';
import PropertyCard from './PropertyCard';
import Loading from '../ui/Loading';

interface PropertyGridProps {
  properties: Property[];
  loading?: boolean;
  onPropertyClick?: (property: Property) => void;
  emptyMessage?: string;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  loading = false,
  onPropertyClick,
  emptyMessage = 'No se encontraron propiedades'
}) => {
  if (loading) {
    return <Loading text="Cargando propiedades..." />;
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500 max-w-md">
          Intenta ajustar los filtros de búsqueda o explora diferentes opciones.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      {properties.map((property) => (
        <div key={property.id} className="h-full">
          <PropertyCard
            property={property}
            onClick={onPropertyClick ? () => onPropertyClick(property) : undefined}
            useLink={!onPropertyClick} // Usar Link solo si no hay onClick
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;

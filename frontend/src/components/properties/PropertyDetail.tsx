import React from 'react';
import Image from 'next/image';
import { Property } from '@/types/property';
import { formatPrice, formatArea, formatRooms } from '@/utils/formatters';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import FavoriteButton from '../favorites/FavoriteButton';

interface PropertyDetailProps {
  property: Property;
  onClose?: () => void;
  showBackButton?: boolean;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({
  property,
  onClose,
  showBackButton = true
}) => {
  const { openLocation, getLocationInfo, isLoading } = useGoogleMaps();
  const locationInfo = getLocationInfo(property.ciudad);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header con botón de cerrar */}
      {showBackButton && onClose && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Detalle de propiedad</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
      )}

      {/* Imagen principal */}
      <div className="relative h-64 md:h-96 bg-gray-200">
        <Image
          src={property.imagen}
          alt={property.titulo}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute top-4 left-4">
          <Badge variant="info" size="md">
            {property.tipo}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <FavoriteButton 
            productId={property.id.toString()} 
            variant="icon" 
            size="lg"
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        {/* Título y ubicación */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {property.titulo}
          </h1>
          
          <div className="flex items-center text-gray-600 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-lg">{property.ciudad}</span>
          </div>

          {/* Precio destacado */}
          <div className="text-3xl md:text-4xl font-bold text-green-600 mb-6">
            {formatPrice(property.precio)}
          </div>
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21V7a2 2 0 012-2h4a2 2 0 012 2v14" />
              </svg>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {formatRooms(property.ambientes)}
            </div>
            <div className="text-sm text-gray-500">Ambientes</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4m-4 0l5.657 5.657m11.314 0L16 4m4 0v4m0-4h-4m4 16v-4m0 4h-4m4 0l-5.657-5.657M4 20l5.657-5.657M4 20v-4m0 4h4" />
              </svg>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {formatArea(property.metros_cuadrados)}
            </div>
            <div className="text-sm text-gray-500">Superficie</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {property.tipo}
            </div>
            <div className="text-sm text-gray-500">Tipo</div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Información adicional</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="font-medium text-gray-700">Precio por m²:</span>{' '}
              {formatPrice(Math.round(property.precio / property.metros_cuadrados))}
            </div>
          </div>
          
          {/* Botón de Google Maps */}
          <div className="mt-4 pt-4 border-t border-blue-200">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openLocation(property.ciudad, property.titulo)}
              disabled={isLoading}
              className="flex items-center text-blue-700 border-blue-300 hover:bg-blue-100 hover:border-blue-400 disabled:opacity-50"
            >
              {isLoading ? (
                <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
              {isLoading ? 'Abriendo...' : 'Ver en Google Maps'}
              {!isLoading && (
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              )}
            </Button>
            <p className="text-xs text-gray-600 mt-2">
              {locationInfo.description}
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button 
            variant="primary" 
            size="lg" 
            className="flex-1"
            onClick={() => window.open(`tel:2616570143`, '_self')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Contactar
          </Button>
          <FavoriteButton 
            productId={property.id.toString()} 
            variant="button" 
            size="lg" 
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/property';
import { formatPrice, formatArea, formatRooms } from '@/utils/formatters';
import Badge from '../ui/Badge';
import FavoriteButton from '../favorites/FavoriteButton';

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
  showRecommendations?: boolean;
  useLink?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onClick,
  showRecommendations = false,
  useLink = true
}) => {
  const CardContent = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col">
      <div className="relative h-48 bg-gray-200 flex-shrink-0">
        <Image
          src={property.imagen}
          alt={property.titulo}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="info" size="sm">
            {property.tipo}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <FavoriteButton productId={property.id.toString()} size="md" />
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 property-title">
            {property.titulo}
          </h3>

          <div className="flex items-center text-gray-600 mb-3">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm truncate">{property.ciudad}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21V7a2 2 0 012-2h4a2 2 0 012 2v14" />
            </svg>
            <span className="truncate">{formatRooms(property.ambientes)}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4m-4 0l5.657 5.657m11.314 0L16 4m4 0v4m0-4h-4m4 16v-4m0 4h-4m4 0l-5.657-5.657M4 20l5.657-5.657M4 20v-4m0 4h4" />
            </svg>
            <span className="truncate">{formatArea(property.metros_cuadrados)}</span>
          </div>
        </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="text-xl font-bold text-green-600 property-price">
            {formatPrice(property.precio)}
          </div>
          {showRecommendations && (
            <Badge variant="success" size="sm">
              Recomendado
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div
        className="cursor-pointer"
        onClick={onClick}
      >
        <CardContent />
      </div>
    );
  }

  // Si useLink es true, envolver en Link
  if (useLink) {
    return (
      <Link href={`/property/${property.id}`}>
        <CardContent />
      </Link>
    );
  }

  // Caso por defecto
  return <CardContent />;
};

export default PropertyCard;

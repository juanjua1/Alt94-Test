'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { propertiesData } from '../../data/properties';
import PropertyCard from '../../components/properties/PropertyCard';
import Loading from '../../components/ui/Loading';

export default function FavoritesPage() {
  const { isAuthenticated } = useAuth();
  const { favorites, isLoading } = useFavorites();

  // Si no está autenticado, mostrar mensaje
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Mis Favoritos
        </h1>
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Inicia sesión para ver tus favoritos</h3>
          <p className="text-gray-500 mb-6">Debes iniciar sesión para poder guardar y ver tus propiedades favoritas.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Ir al Inicio
          </Link>
        </div>
      </div>
    );
  }

  // Mostrar loading
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Mis Favoritos
        </h1>
        <Loading />
      </div>
    );
  }

  const favoriteProperties = propertiesData.filter(property => 
    favorites.includes(property.id.toString())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Mis Favoritos
        </h1>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          ← Volver al Inicio
        </Link>
      </div>

      {favoriteProperties.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes favoritos aún</h3>
          <p className="text-gray-500 mb-6">Explora nuestras propiedades y guarda las que más te gusten.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Explorar Propiedades
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-6">
            Tienes {favoriteProperties.length} {favoriteProperties.length === 1 ? 'propiedad favorita' : 'propiedades favoritas'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

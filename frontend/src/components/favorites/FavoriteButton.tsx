'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/components/providers/ToastProvider';

interface FavoriteButtonProps {
  productId: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button';
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  productId, 
  size = 'md', 
  variant = 'icon',
  className = '' 
}) => {
  const { isAuthenticated } = useAuth();
  const { toggleFavorite, isFavorite, isLoading } = useFavorites();
  const { showToast } = useToast();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      showToast('Debes iniciar sesión para guardar favoritos', 'warning');
      return;
    }
    
    await toggleFavorite(productId);
  };

  const isProductFavorite = isFavorite(productId);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const buttonSizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200
          ${isAuthenticated 
            ? isProductFavorite 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300 cursor-pointer'
          }
          ${className}
        `}
        title={
          !isAuthenticated 
            ? 'Haz clic para iniciar sesión y guardar favoritos'
            : isProductFavorite 
              ? 'Quitar de favoritos' 
              : 'Agregar a favoritos'
        }
      >
        <svg 
          className={sizeClasses[size]} 
          fill={isAuthenticated && isProductFavorite ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
        {isAuthenticated && isProductFavorite ? 'Guardado' : 'Guardar'}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        ${buttonSizeClasses[size]} rounded-full transition-all duration-200
        ${isAuthenticated 
          ? isProductFavorite 
            ? 'bg-red-500 text-white hover:bg-red-600 shadow-md' 
            : 'bg-white text-gray-600 hover:text-red-500 hover:bg-red-50 shadow-sm border border-gray-200'
          : 'bg-white text-gray-500 hover:bg-gray-50 shadow-sm border border-gray-200 cursor-pointer'
        }
        ${className}
      `}
      title={
        !isAuthenticated 
          ? 'Haz clic para iniciar sesión y guardar favoritos'
          : isProductFavorite 
            ? 'Quitar de favoritos' 
            : 'Agregar a favoritos'
      }
    >
      {isLoading ? (
        <div className={`${sizeClasses[size]} animate-spin`}>
          <svg fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <svg 
          className={sizeClasses[size]} 
          fill={isAuthenticated && isProductFavorite ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;

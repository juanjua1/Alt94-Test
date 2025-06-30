'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import favoritesService from '@/services/favoritesService';
import { useToast } from '@/components/providers/ToastProvider';

interface FavoritesContextType {
  favorites: string[];
  isLoading: boolean;
  addToFavorites: (productId: string) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();

  const refreshFavorites = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      const userFavorites = await favoritesService.getFavorites();
      setFavorites(userFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      showToast('Error al cargar favoritos', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, showToast]);

  useEffect(() => {
    if (isAuthenticated && user) {
      refreshFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, user, refreshFavorites]);

  const addToFavorites = async (productId: string) => {
    if (!isAuthenticated) {
      showToast('Debes iniciar sesión para guardar favoritos', 'warning');
      return;
    }

    try {
      await favoritesService.addFavorite(productId);
      await refreshFavorites();
      showToast('Propiedad agregada a favoritos', 'success');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      showToast('Error al agregar a favoritos', 'error');
    }
  };

  const removeFromFavorites = async (productId: string) => {
    if (!isAuthenticated) return;

    try {
      await favoritesService.removeFavorite(productId);
      await refreshFavorites();
      showToast('Propiedad removida de favoritos', 'info');
    } catch (error) {
      console.error('Error removing from favorites:', error);
      showToast('Error al remover de favoritos', 'error');
    }
  };

  const toggleFavorite = async (productId: string) => {
    if (isFavorite(productId)) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
    }
  };

  const isFavorite = (productId: string): boolean => {
    return favorites.includes(productId);
  };

  const value: FavoritesContextType = {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    refreshFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

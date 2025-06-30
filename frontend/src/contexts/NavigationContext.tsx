'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  previousPropertyId: number | null;
  setPreviousPropertyId: (id: number | null) => void;
  navigationHistory: number[];
  addToHistory: (id: number) => void;
  clearHistory: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [previousPropertyId, setPreviousPropertyId] = useState<number | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<number[]>([]);

  const addToHistory = (id: number) => {
    setNavigationHistory(prev => {
      // Si ya estamos en esta propiedad, no duplicar
      if (prev[prev.length - 1] === id) return prev;
      
      // Mantener solo los últimos 5 elementos para no usar demasiada memoria
      const newHistory = [...prev, id].slice(-5);
      
      // Establecer el ID anterior (el penúltimo en el historial)
      if (newHistory.length >= 2) {
        setPreviousPropertyId(newHistory[newHistory.length - 2]);
      } else {
        setPreviousPropertyId(null);
      }
      
      return newHistory;
    });
  };

  const clearHistory = () => {
    setNavigationHistory([]);
    setPreviousPropertyId(null);
  };

  return (
    <NavigationContext.Provider value={{
      previousPropertyId,
      setPreviousPropertyId,
      navigationHistory,
      addToHistory,
      clearHistory
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

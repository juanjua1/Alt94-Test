'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PropertiesContextType {
  totalProperties: number;
  setTotalProperties: (total: number) => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

interface PropertiesProviderProps {
  children: ReactNode;
}

export const PropertiesProvider: React.FC<PropertiesProviderProps> = ({ children }) => {
  const [totalProperties, setTotalProperties] = useState(0);

  return (
    <PropertiesContext.Provider value={{ totalProperties, setTotalProperties }}>
      {children}
    </PropertiesContext.Provider>
  );
};

export const usePropertiesContext = (): PropertiesContextType => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error('usePropertiesContext must be used within a PropertiesProvider');
  }
  return context;
};

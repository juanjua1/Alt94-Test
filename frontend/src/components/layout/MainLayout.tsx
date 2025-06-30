'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { usePropertiesContext } from '@/contexts/PropertiesContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { totalProperties } = usePropertiesContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main content area with left margin for sidebar */}
      <div className="ml-16">
        <Header totalProperties={totalProperties} />
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

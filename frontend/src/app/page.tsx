'use client';

import { useState, useEffect } from 'react';
import PropertiesApp from '@/components/PropertiesApp';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const isRecentLogin = sessionStorage.getItem('recent_login') === 'true';
      
      if (isRecentLogin) {
        setShowWelcomeMessage(true);
        sessionStorage.removeItem('recent_login');
        
        setTimeout(() => {
          setIsWelcomeVisible(true);
        }, 100);
        
        const fadeTimer = setTimeout(() => {
          setIsWelcomeVisible(false);
        }, 4000);
        
        const hideTimer = setTimeout(() => {
          setShowWelcomeMessage(false);
        }, 5000);

        return () => {
          clearTimeout(fadeTimer);
          clearTimeout(hideTimer);
        };
      }
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs 
        items={[
          { label: 'Inicio' }
        ]} 
      />
      
      {showWelcomeMessage && isAuthenticated && user && (
        <div className={`mb-6 p-4 bg-green-50 border border-green-200 rounded-md transition-all duration-1000 transform ${
          isWelcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-green-800">
                ¡Bienvenido de vuelta!
              </h3>
              <p className="text-green-700">
                Has iniciado sesión como <strong>{user.email}</strong>
              </p>
            </div>
            <button
              onClick={() => {
                setIsWelcomeVisible(false);
                setTimeout(() => setShowWelcomeMessage(false), 1000);
              }}
              className="text-green-600 hover:text-green-800 transition-colors"
              title="Cerrar mensaje"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <PropertiesApp />
    </div>
  );
}

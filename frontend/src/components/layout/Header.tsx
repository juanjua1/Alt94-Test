'use client';

import React from 'react';
import Link from 'next/link';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  totalProperties?: number;
}

const Header: React.FC<HeaderProps> = ({ totalProperties = 0 }) => {
  const { value: animatedCount, isAnimating } = useCounterAnimation(totalProperties, 2000, 600);
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="ml-4 border-l border-gray-300 pl-4">
              <h1 className="text-xl font-bold text-gray-900">PropiedadesAR</h1>
              <p className="text-sm text-gray-500">Sistema de recomendaciones inmobiliarias</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm text-gray-500 flex items-center">
              <span className={`font-medium tabular-nums inline-block min-w-[3ch] text-right transition-all duration-300 ease-out ${
                isAnimating ? 'text-blue-600 scale-105 font-semibold' : ''
              }`}>
                {animatedCount.toLocaleString()}
              </span>
              {isAnimating && (
                <span className="ml-1 text-blue-500 animate-pulse">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h11v11H4V4z" clipRule="evenodd"/>
                  </svg>
                </span>
              )}
              <span className="ml-1">propiedades disponibles</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="animate-pulse flex space-x-2">
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
              </div>
            ) : isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Hola, </span>
                  <span className="text-blue-600">{user.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

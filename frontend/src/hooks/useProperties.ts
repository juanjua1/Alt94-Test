import { useState, useMemo, useEffect } from 'react';
import { Property, PropertyFilters } from '@/types/property';
import { propertyService } from '@/services/propertyService';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const itemsPerPage = 12;

  useEffect(() => {
    const loadProperties = () => {
      try {
        const allProperties = propertyService.getAllProperties();
        setProperties(allProperties);
        setFilteredProperties(allProperties);
      } catch (error) {
        console.error('Error cargando propiedades:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  useEffect(() => {
    let result = properties;

    if (searchTerm.trim()) {
      result = propertyService.searchProperties(searchTerm);
    }

    if (Object.keys(filters).length > 0) {
      result = result.filter(property => {
        if (filters.ciudad && property.ciudad !== filters.ciudad) return false;
        if (filters.tipo && property.tipo !== filters.tipo) return false;
        if (filters.precioMin && property.precio < filters.precioMin) return false;
        if (filters.precioMax && property.precio > filters.precioMax) return false;
        if (filters.ambientesMin && property.ambientes < filters.ambientesMin) return false;
        if (filters.ambientesMax && property.ambientes > filters.ambientesMax) return false;
        return true;
      });
    }

    setFilteredProperties(result);
    setCurrentPage(1); // Reset página al filtrar
  }, [searchTerm, filters, properties]);

  // Calcular propiedades paginadas
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProperties.slice(startIndex, endIndex);
  }, [filteredProperties, currentPage, itemsPerPage]);

  // Calcular información de paginación
  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    return {
      totalItems: filteredProperties.length,
      totalPages,
      currentPage,
      hasNextPage,
      hasPrevPage,
      startItem: (currentPage - 1) * itemsPerPage + 1,
      endItem: Math.min(currentPage * itemsPerPage, filteredProperties.length)
    };
  }, [filteredProperties.length, currentPage, itemsPerPage]);

  // Obtener opciones para filtros
  const filterOptions = useMemo(() => {
    return propertyService.getFilterOptions();
  }, []);

  // Funciones para actualizar el estado
  const updateFilters = (newFilters: Partial<PropertyFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const nextPage = () => {
    if (paginationInfo.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (paginationInfo.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= paginationInfo.totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    // Datos
    properties: paginatedProperties,
    allProperties: properties,
    filteredProperties,
    
    // Estado
    loading,
    searchTerm,
    filters,
    
    // Paginación
    pagination: paginationInfo,
    
    // Opciones
    filterOptions,
    
    // Acciones
    setSearchTerm,
    updateFilters,
    clearFilters,
    nextPage,
    prevPage,
    goToPage
  };
};

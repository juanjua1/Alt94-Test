import React from 'react';
import { type PropertyFilters as PropertyFiltersType } from '@/types/property';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface PropertyFiltersProps {
  filters: PropertyFiltersType;
  searchTerm: string;
  filterOptions: {
    ciudades: string[];
    tipos: string[];
  };
  onFiltersChange: (filters: Partial<PropertyFiltersType>) => void;
  onSearchChange: (searchTerm: string) => void;
  onClearFilters: () => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  searchTerm,
  filterOptions,
  onFiltersChange,
  onSearchChange,
  onClearFilters
}) => {
  const hasActiveFilters = Object.keys(filters).length > 0 || searchTerm.trim() !== '';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filtros de búsqueda</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Búsqueda por texto */}
        <div className="lg:col-span-2">
          <Input
            label="Buscar"
            placeholder="Buscar por título, ciudad o característica..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filtro por ciudad */}
        <Select
          label="Ciudad"
          placeholder="Todas las ciudades"
          value={filters.ciudad || ''}
          onChange={(e) => onFiltersChange({ ciudad: e.target.value || undefined })}
          options={filterOptions.ciudades.map(ciudad => ({
            value: ciudad,
            label: ciudad
          }))}
        />

        {/* Filtro por tipo */}
        <Select
          label="Tipo de propiedad"
          placeholder="Todos los tipos"
          value={filters.tipo || ''}
          onChange={(e) => onFiltersChange({ tipo: e.target.value || undefined })}
          options={filterOptions.tipos.map(tipo => ({
            value: tipo,
            label: tipo
          }))}
        />

        {/* Precio mínimo */}
        <Input
          label="Precio mínimo"
          type="number"
          prefix="$"
          hideSpinners={true}
          placeholder="0"
          value={filters.precioMin || ''}
          onChange={(e) => onFiltersChange({ 
            precioMin: e.target.value ? Number(e.target.value) : undefined 
          })}
        />

        {/* Precio máximo */}
        <Input
          label="Precio máximo"
          type="number"
          prefix="$"
          hideSpinners={true}
          placeholder="Sin límite"
          value={filters.precioMax || ''}
          onChange={(e) => onFiltersChange({ 
            precioMax: e.target.value ? Number(e.target.value) : undefined 
          })}
        />

        {/* Ambientes mínimos */}
        <Input
          label="Ambientes mínimos"
          type="number"
          min="1"
          placeholder="1"
          value={filters.ambientesMin || ''}
          onChange={(e) => onFiltersChange({ 
            ambientesMin: e.target.value ? Number(e.target.value) : undefined 
          })}
        />

        {/* Ambientes máximos */}
        <Input
          label="Ambientes máximos"
          type="number"
          min="1"
          placeholder="Sin límite"
          value={filters.ambientesMax || ''}
          onChange={(e) => onFiltersChange({ 
            ambientesMax: e.target.value ? Number(e.target.value) : undefined 
          })}
        />
      </div>
    </div>
  );
};

export default PropertyFilters;

import { useState, useEffect, useMemo } from 'react';
import { ConflictZone, MapFilters } from '@/types';
import { conflictZones } from '@/data/conflictData';

export function useMapData() {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MapFilters>({
    continents: [],
    conflictTypes: [],
    statuses: [],
    severityLevels: [],
    search: '',
  });

  const filteredZones = useMemo(() => {
    return conflictZones.filter((zone) => {
      // Search filter
      if (filters.search && !zone.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Continent filter
      if (filters.continents.length > 0 && !filters.continents.includes(zone.continent)) {
        return false;
      }

      // Conflict type filter
      if (filters.conflictTypes.length > 0 && !filters.conflictTypes.includes(zone.conflictType)) {
        return false;
      }

      // Status filter
      if (filters.statuses.length > 0 && !filters.statuses.includes(zone.status)) {
        return false;
      }

      // Severity filter
      if (filters.severityLevels.length > 0 && !filters.severityLevels.includes(zone.severity)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const updateFilters = (newFilters: Partial<MapFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      continents: [],
      conflictTypes: [],
      statuses: [],
      severityLevels: [],
      search: '',
    });
  };

  return {
    zones: filteredZones,
    allZones: conflictZones,
    loading,
    filters,
    updateFilters,
    clearFilters,
  };
}
import { useEffect, useCallback } from 'react';
import { useClimaSearch } from '../context/ClimaSearchContext';

export const useClima = () => {
  const climaSearch = useClimaSearch();
  const { actualizarClima, setResults, setLastSearch } = climaSearch;

  const activarGeolocalizacion = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          actualizarClima(`${latitude},${longitude}`);
        },
        () => {
          console.log("Geolocalización no disponible o permiso denegado");
          actualizarClima('Helsinki'); // Ciudad por defecto si falla la geolocalización
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000,
        }
      );
    } else {
      actualizarClima('Helsinki');
    }
  }, [actualizarClima]);

  useEffect(() => {
    activarGeolocalizacion();
  }, [activarGeolocalizacion]);

  const resetBusquedaManual = useCallback(() => {
    if (typeof setResults === 'function') {
      setResults([]);
    }
    if (typeof setLastSearch === 'function') {
      setLastSearch('');
    }
  }, [setResults, setLastSearch]);

  const buscarClimaManual = useCallback((ubicacion) => {
    actualizarClima(ubicacion);
  }, [actualizarClima]);

  return {
    ...climaSearch,
    activarGeolocalizacion,
    resetBusquedaManual,
    buscarClimaManual
  };
};


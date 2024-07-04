import React, { createContext, useState, useContext, useCallback } from 'react';
import { obtenerClima, obtenerPronostico, obtenerLocaciones } from '../utils/api';

const ClimaSearchContext = createContext();

export const ClimaSearchProvider = ({ children }) => {
  const [climaActual, setClimaActual] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const [ciudad, setCiudad] = useState('');
  const [unidad, setUnidad] = useState('C');
  const [results, setResults] = useState([]);
  const [lastSearch, setLastSearch] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const actualizarClima = useCallback(async (ubicacion) => {
    console.log('Actualizando clima para:', ubicacion);
    setIsLoading(true);
    try {
      setError(null);
      const datosClima = await obtenerClima(ubicacion);
      const datosPronostico = await obtenerPronostico(ubicacion);
      console.log('Datos de clima obtenidos:', datosClima);
      console.log('Datos de pronóstico obtenidos:', datosPronostico);
      setClimaActual(datosClima);
      setPronostico(datosPronostico);
      setCiudad(datosClima.name);
    } catch (error) {
      console.error("Error al actualizar el clima:", error);
      setError("No se pudo obtener la información del clima. Por favor, intenta más tarde.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const buscarLocaciones = useCallback(async (searchTerm) => {
    if (searchTerm.trim()) {
      try {
        const data = await obtenerLocaciones(searchTerm);
        setResults(data);
        setLastSearch(searchTerm);
      } catch (error) {
        console.error("Error al buscar locaciones:", error);
        setError("No se pudieron obtener las locaciones. Por favor, intenta más tarde.");
      }
    }
  }, []);

  const cambiarUnidad = useCallback((nuevaUnidad) => {
    setUnidad(nuevaUnidad);
  }, []);

  return (
    <ClimaSearchContext.Provider
      value={{
        climaActual,
        pronostico,
        ciudad,
        unidad,
        results,
        lastSearch,
        error,
        isLoading,
        actualizarClima,
        buscarLocaciones,
        cambiarUnidad
      }}
    >
      {children}
    </ClimaSearchContext.Provider>
  );
};

export const useClimaSearch = () => useContext(ClimaSearchContext);
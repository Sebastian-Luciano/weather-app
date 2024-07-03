import React, { createContext, useState, useContext } from 'react';
import { obtenerClima, obtenerPronostico, obtenerLocaciones } from '../utils/api';


const ClimaSearchContext = createContext();

export const ClimaSearchProvider = ({ children }) => {
  const [climaActual, setClimaActual] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const [ciudad, setCiudad] = useState('');
  const [unidad, setUnidad] = useState('C');
  const [results, setResults] = useState([]);
  const [lastSearch, setLastSearch] = useState('');

  const actualizarClima = async (ubicacion) => {
    try {
      const datosClima = await obtenerClima(ubicacion);
      const datosPronostico = await obtenerPronostico(ubicacion);
      setClimaActual(datosClima);
      setPronostico(datosPronostico);
      setCiudad(datosClima.name);
    } catch (error) {
      console.error("Error al actualizar el clima:", error);
    }
  };

  const buscarLocaciones = async (searchTerm) => {
    if (searchTerm.trim()) {
      const data = await obtenerLocaciones(searchTerm);
      setResults(data);
      setLastSearch(searchTerm);
    }
  };

  const cambiarUnidad = (nuevaUnidad) => {
    setUnidad(nuevaUnidad);
  };

  return (
    <ClimaSearchContext.Provider 
      value={{ 
        climaActual, 
        pronostico, 
        ciudad, 
        unidad, 
        results, 
        lastSearch, 
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
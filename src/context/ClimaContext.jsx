import React, { createContext, useState, useContext } from 'react';
import { obtenerClima, obtenerPronostico } from '../utils/api';

const ClimaContext = createContext();

export const ClimaProvider = ({ children }) => {
  const [climaActual, setClimaActual] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const [ciudad, setCiudad] = useState('Helsinki');
  const [unidad, setUnidad] = useState('C');

  const actualizarClima = async (nuevaCiudad) => {

      const datosClima = await obtenerClima(nuevaCiudad);
      const datosPronostico = await obtenerPronostico(nuevaCiudad);
      setClimaActual(datosClima);
      setPronostico(datosPronostico);
      setCiudad(nuevaCiudad);
  };

  const cambiarUnidad = (nuevaUnidad) => {
    setUnidad(nuevaUnidad);
  };

  return (
    <ClimaContext.Provider value={{ climaActual, pronostico, ciudad, unidad, actualizarClima, cambiarUnidad }}>
      {children}
    </ClimaContext.Provider>
  );
};

export const useClimaContext = () => useContext(ClimaContext);
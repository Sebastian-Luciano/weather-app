import { useEffect } from 'react';
import { useClimaContext } from '../context/ClimaContext';

export const useClima = () => {
  const { ciudad, actualizarClima } = useClimaContext();

  useEffect(() => {
    actualizarClima(ciudad);
  }, [ciudad]);

  return useClimaContext();
};
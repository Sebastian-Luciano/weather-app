import React, { createContext, useContext } from 'react';

// Importación de imágenes
import Clear from '../imagen/01d.png';
import ClearNight from '../imagen/01n.png';
import LightCloud from '../imagen/02d.png';
import LightCloudNight from '../imagen/02n.png';
import HeavyCloud from '../imagen/03d.png';
import HeavyCloudNight from '../imagen/03n.png';
import BrokenCloud from '../imagen/04d.png';
import BrokenCloudNight from '../imagen/04n.png';
import Shower from '../imagen/09d.png';
import ShowerNight from '../imagen/09n.png';
import Rain from '../imagen/10d.png';
import RainNight from '../imagen/10n.png';
import Thunderstorm from '../imagen/11d.png';
import ThunderstormNight from '../imagen/11n.png';
import Snow from '../imagen/13d.png';
import SnowNight from '../imagen/13n.png';
import Mist from '../imagen/50d.png';
import MistNight from '../imagen/50n.png';
import Hail from '../imagen/Hail.png';
import Sleet from '../imagen/Sleet.png';

const ImagenContext = createContext();

export const useImagen = () => useContext(ImagenContext);

export const ImagenProvider = ({ children }) => {
  const getImagenClima = (iconCode, description) => {
    const imagenes = {
      '01d': Clear,
      '01n': ClearNight,
      '02d': LightCloud,
      '02n': LightCloudNight,
      '03d': HeavyCloud,
      '03n': HeavyCloudNight,
      '04d': BrokenCloud,
      '04n': BrokenCloudNight,
      '09d': Shower,
      '09n': ShowerNight,
      '10d': Rain,
      '10n': RainNight,
      '11d': Thunderstorm,
      '11n': ThunderstormNight,
      '13d': Snow,
      '13n': SnowNight,
      '50d': Mist,
      '50n': MistNight,
    };

    if (description.toLowerCase().includes('hail')) return Hail;
    if (description.toLowerCase().includes('sleet') ||
      (description.toLowerCase().includes('rain') && description.toLowerCase().includes('snow'))) return Sleet;

    return imagenes[iconCode] || HeavyCloud;
  };

  return (
    <ImagenContext.Provider value={{ getImagenClima }}>
      {children}
    </ImagenContext.Provider>
  )
};
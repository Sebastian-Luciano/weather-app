import React, { useState, useEffect } from 'react';
import { useImagen } from '../context/ImagenContext';
import SearchModal from './SearchModal';
import { useClima } from '../hooks/useClima';
import BackgroundFondo from '../imagen/CloudBackground.png'

export default function MostrarClima() {
  const { climaActual, ciudad, unidad, activarGeolocalizacion } = useClima();
  const { getImagenClima } = useImagen();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    activarGeolocalizacion();
  }, [activarGeolocalizacion]);

  if (!climaActual) {
    return <div className="text-white text-center p-4">Cargando...</div>;
  }

  const weatherImage = getImagenClima(climaActual.weather[0].icon, climaActual.weather[0].description);
  const temperatura = unidad === 'C' ? climaActual.main.temp : (climaActual.main.temp * 9 / 5) + 32;

  const today = new Date();
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const dateString = today.toLocaleDateString('en-GB', options);

  return (
    <div className='relative w-full h-full bg-[#1E213A] overflow-hidden flex flex-col justify-between'>
     <img src={BackgroundFondo} alt='Cloud background' className='absolute top-8 left-0 object-cover w-full h-[40%] opacity-10' />
      <div className='relative z-10 p-4 flex flex-col h-full'>
        <div className='flex justify-between mb-4'>
          <button
            onClick={() => setShowModal(true)}
            className='bg-gray-500 text-white px-4 py-2'
          >
            Search for places
          </button>
          <button
            onClick={activarGeolocalizacion}
            className='bg-gray-500 text-white w-10 h-10 rounded-full flex items-center justify-center'
          >
            <span className='material-icons'>my_location</span>
          </button>
        </div>
        <div className='flex-grow flex flex-col items-center justify-center'>
          <img src={weatherImage} alt={climaActual.weather[0].description} className='w-[150px] h-[174px] lg:w-52 lg:h-52 object-contain lg:mb-16 mb-10 lg:pb-16' />
          <p className='text-[144px] lg:text-9xl font-light mt-5 mb-8'>{Math.round(temperatura)}<span className='text-5xl'>°{unidad}</span></p>
          <p className='text-4xl text-gray-400 mt-5 mb-8'>{climaActual.weather[0].main}</p>
        </div>
      </div>
      <div className='p-4 mt-auto text-center'>
        <p className='text-lg text-gray-400 mb-4'>Today • {dateString}</p>
        <p className='text-lg flex items-center justify-center'>
          <span className='material-icons mr-2'>location_on</span>
          {ciudad}
        </p>
      </div>
      <SearchModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
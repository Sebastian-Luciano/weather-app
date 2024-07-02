 
import React, { useState } from 'react';
import { useClima } from '../hooks/useClima';
import { useImagen } from '../context/ImagenContext.jsx';

export default function MostrarClima() {
  const { climaActual, ciudad, unidad, actualizarClima } = useClima();
  const { getImagenClima } = useImagen();
  const [showModal, setShowModal] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  if (!climaActual) return <div>Cargando...</div>;

  const weatherImage = getImagenClima(climaActual.weather[0].icon, climaActual.weather[0].description);
  const temperatura = unidad === 'C' ? climaActual.main.temp : (climaActual.main.temp * 9/5) + 32;

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        actualizarClima(`${latitude},${longitude}`);
      });
    }
  };

  const manejarBusqueda = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      actualizarClima(busqueda);
      setBusqueda('');
      setShowModal(false);
    }
  };                                         

  const today = new Date();
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const dateString = today.toLocaleDateString('en-GB', options);

  return (
    <div className='relative w-full lg:w-[459px] h-screen lg:h-[1023px] bg-[#1E213A] overflow-hidden)] '>
      <img src='src/imagen/Cloud-background.png'alt='Cloud background' className='absolute top-8 left-0 object-cover w-[full] h-[40%] opacity-10' />
      <div className='relative z-10 p-4 flex flex-col h-full'>
     
        <div className='flex justify-between mb-4'>
          <button 
            onClick={() => setShowModal(true)}
            className='bg-gray-500 text-white px-4 py-2 rounded'
          >
            Search for places
          </button>
          <button 
            onClick={handleGeolocation}
            className='bg-gray-500 text-white w-10 h-10 rounded-full flex items-center justify-center'
          >
            <span className='material-icons bg-red'>my_location</span>
          </button>
        </div>
        <div className='flex-grow flex flex-col items-center justify-center'>
        <img src={weatherImage} alt={climaActual.weather[0].description} className='w-52 h-52 object-contain mb-20' />
          <p className='text-9xl font-light mt-5 mb-8'>{Math.round(temperatura)}<span className='text-5xl'>°{unidad}</span></p>
          <p className='text-4xl text-gray-400 mt-5 mb-8'>{climaActual.weather[0].main}</p>
          <p className='text-lg text-gray-400 mt-[80px] pt-12 '>Today • {dateString}</p>
          <p className='text-lg flex items-center mt-6'>
            <span className='material-icons mr-2'>location_on</span>
            {ciudad}
          </p>
        </div>
      </div>
      {showModal && (
        <div className='absolute top-0 left-0 w-full h-full bg-[#1E213A] z-20 p-4'>
          <button onClick={() => setShowModal(false)} className='absolute top-4 right-4 text-white'>
            <span className='material-icons'>close</span>
          </button>
          <form onSubmit={manejarBusqueda} className='flex mt-8'>
            <input
              type='text'
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder='Search location'
              className='flex-grow bg-transparent border border-white text-white p-2'
            />
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 ml-2'>
              Search
            </button>
          </form>
        </div>
      )}
    </div>
  );
} 
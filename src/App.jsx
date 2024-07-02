import React from 'react';
import MostrarClima from './components/MostrarClima';
import TarjetaPronostico from './components/TarjetaPronostico';
import TarjetaDestacada from './components/TarjetaDestacada';
import { useClima } from './hooks/useClima';


export default function App() {
  const { pronostico, climaActual, cambiarUnidad, unidad } = useClima();

  return (
    <div className='w-[1440px] min-h-screen bg-[#100E1D] text-white font-raleway'>
      <div className='container mx-auto flex flex-col lg:flex-row'>
        <div className='w-full lg:w-[459px] h-auto lg:h-[1023px] '>
          <MostrarClima />
        </div>
        <div className='flex flex-col items-center justify-center w-full lg:w-[calc(100%-459px)] h-auto lg:h-[1023px] p-4 lg:p-8'>
        <div className='px-4 pt-6 flex-1 w-full'>
          <div className='flex justify-end mb-4 font-raleway font-bold text-[18px]'>
            <button
              onClick={() => cambiarUnidad('C')}
              className={`rounded-full w-10 h-10 mr-2 ${unidad === 'C' ? 'bg-white text-black' : 'bg-gray-500 text-white'}`}
            >
              °C
            </button>
            <button
              onClick={() => cambiarUnidad('F')}
              className={`rounded-full w-10 h-10 ${unidad === 'F' ? 'bg-white text-black' : 'bg-gray-500 text-white'}`}
            >
              °F
            </button>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8'>
            {pronostico && pronostico.list && pronostico.list.slice(0, 5).map((dia, index) => (
              <TarjetaPronostico key={index} dia={dia} index={index} />
            ))}
          </div>
          <div>
            <h2 className='text-2xl font-bold mt-12 mb-4'>Today's Highlights</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {climaActual && (
                <>
                  <TarjetaDestacada
                    titulo='Wind status'
                    valor={climaActual && climaActual.wind ? Math.round(climaActual.wind.speed) : 'N/A'}
                    unidad='mph'
                    tipo='viento'
                  />
                  <TarjetaDestacada titulo='Humidity' valor={climaActual.main.humidity} unidad='%' tipo='humedad' />
                  <TarjetaDestacada titulo='Visibility' valor={(climaActual.visibility / 1609.34).toFixed(1)} unidad='miles' />
                  <TarjetaDestacada titulo='Air Pressure' valor={climaActual.main.pressure} unidad='mb' />
                </>
              )}
            </div>
          </div>
        </div>
        <div className='text-white text-center'>
          <p>created by Sebastian - devChallenges.io</p>
        </div>
        </div>
      </div>
    </div>
  );
} 
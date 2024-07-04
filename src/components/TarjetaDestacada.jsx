import React from 'react';
import { useClimaSearch } from '../context/ClimaSearchContext';

const direccionViento = (grados) => {
  const direcciones = [
    { abreviatura: 'N', grados: 0 },
    { abreviatura: 'NNE', grados: 22.5 },
    { abreviatura: 'NE', grados: 45 },
    { abreviatura: 'ENE', grados: 67.5 },
    { abreviatura: 'E', grados: 90 },
    { abreviatura: 'ESE', grados: 112.5 },
    { abreviatura: 'SE', grados: 135 },
    { abreviatura: 'SSE', grados: 157.5 },
    { abreviatura: 'S', grados: 180 },
    { abreviatura: 'SSW', grados: 202.5 },
    { abreviatura: 'SW', grados: 225 },
    { abreviatura: 'WSW', grados: 247.5 },
    { abreviatura: 'W', grados: 270 },
    { abreviatura: 'WNW', grados: 292.5 },
    { abreviatura: 'NW', grados: 315 },
    { abreviatura: 'NNW', grados: 337.5 }
  ];

  const index = Math.round(((grados % 360) / 22.5));
  return direcciones[index % 16].abreviatura;
};

export default function TarjetaDestacada({ titulo, valor, tipo }) {
  const { unidad } = useClimaSearch();

  const renderContenido = () => {
    switch (tipo) {
      case 'viento':
        const velocidad = unidad === 'C' ? valor.speed : (valor.speed * 1.60934).toFixed(1);
        const unidadVelocidad = unidad === 'C' ? 'mph' : 'km/h';
        const direccion = direccionViento(valor.deg);
        return (
          <>
            <p className='text-6xl font-bold text-center mb-4'>
              {velocidad}
              <span className='text-3xl ml-2 font-normal'>{unidadVelocidad}</span>
            </p>
            <div className='flex items-center justify-center'>
              <div className='bg-gray-600 rounded-full p-2 mr-2' style={{ transform: `rotate(${valor.deg}deg)` }}>
                <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 -960 960 960'>
                  <path fillRule='evenodd' d='m200-120-40-40 320-720 320 720-40 40-280-120-280 120Zm84-124 196-84 196 84-196-440-196 440Zm196-84Z' clipRule='evenodd' />
                </svg>
              </div>
              <span>{direccion}</span>
            </div>
          </>
        );
      case 'humedad':
        return (
          <div className='flex flex-col items-center'>
            <p className='text-6xl font-bold mb-4'>
              {valor}
              <span className='text-3xl ml-2 font-normal'>%</span>
            </p>
            <div className='w-full max-w-[229px] mt-3'>
              <div className='flex justify-between text-xs mb-1'>
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
              <div className='w-full bg-white rounded-full h-2'>
                <div className='bg-yellow-400 h-2 rounded-full' style={{ width: `${valor}%` }}></div>
              </div>
              <div className='text-right text-xs mt-1'>%</div>
            </div>
          </div>
        );
      case 'visibilidad':
        const distancia = unidad === 'C' ? (valor / 1609.34).toFixed(1) : (valor / 1000).toFixed(1);
        const unidadDistancia = unidad === 'C' ? 'miles' : 'km';
        return (
          <p className='text-6xl font-bold text-center mb-4'>
            {distancia}
            <span className='text-3xl ml-2 font-normal'>{unidadDistancia}</span>
          </p>
        );
      case 'presion':
        const presion = unidad === 'C' ? valor : (valor * 0.02953).toFixed(2);
        const unidadPresion = unidad === 'C' ? 'mb' : 'inHg';
        return (
          <p className='text-6xl font-bold text-center mb-4'>
            {presion}
            <span className='text-3xl ml-2 font-normal'>{unidadPresion}</span>
          </p>
        );
      default:
        return <p className='text-6xl font-bold text-center mb-4'>{valor}</p>;
    }
  };

  return (
    <div className={`bg-[#1E213A] p-4  text-white w-[328px] h-[204px] font-raleway`}>
      <h3 className='text-base font-medium text-center mb-4'>{titulo}</h3>
      {renderContenido()}
    </div>
  );
}
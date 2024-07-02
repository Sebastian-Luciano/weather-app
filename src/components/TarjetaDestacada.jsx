import React from 'react';

export default function TarjetaDestacada({ titulo, valor, unidad, tipo }) {
  const esVientoOHumedad = tipo === 'viento' || tipo === 'humedad';

  return (
    <div className={`bg-[#1E213A] p-4 rounded-lg text-white ${esVientoOHumedad ? 'w-[328px] h-[204px]' : 'w-[328px] h-[160px]'} font-raleway`}>
      <h3 className='text-base font-medium text-center mb-4'>{titulo}</h3>
      <p className='text-6xl font-bold text-center mb-4'>{valor}<span className='text-4xl font-medium'>{unidad}</span></p>

      {tipo === 'viento' && (
        <div className='flex items-center justify-center'>
          <div className='bg-gray-600 rounded-full p-2 mr-2'>
            <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
          </div>
          <span>WSW</span>
        </div>
      )}

      {tipo === 'humedad' && (
        <div className='flex w-full justify-center'>
          <div className='w-[229px] mt-3'>
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
      )}
    </div>
  );
};
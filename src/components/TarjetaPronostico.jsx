import React from 'react';
import { useClima } from '../hooks/useClima';
import { useImagen } from '../context/ImagenContext';

const diasSemana = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function TarjetaPronostico({ dia, index }) {
  const { unidad } = useClima();
  const imagenContext = useImagen();
  const { getImagenClima } = imagenContext;


  const tempMax = unidad === 'C' ? dia.main.temp_max : (dia.main.temp_max * 9/5) + 32;
  const tempMin = unidad === 'C' ? dia.main.temp_min : (dia.main.temp_min * 9/5) + 32;
  
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + index + 1);
  let diaTexto;
  
  if (index === 0) {
    diaTexto = 'Tomorrow';
  } else {
    const diaSemana = diasSemana[fecha.getDay()];
    const diaMes = fecha.getDate();
    const mes = fecha.toLocaleString('default', { month: 'short' });
    diaTexto = `${diaSemana}, ${diaMes} ${mes}`;
  }


  return (
    <div className="bg-[#1E213A] p-4 rounded-lg text-white text-center w-full max-w-[120px] h-[177px] sm:h-auto">
    <p className="text-sm mb-2">{diaTexto}</p>
    <img 
        src={getImagenClima(dia.weather[0].icon, dia.weather[0].description)} 
        alt={dia.weather[0].description}
      className="mx-auto w-16 h-16 my-4 object-contain" 
    />
    <div className="flex justify-between text-sm">
      <span>{Math.round(tempMax)}°{unidad}</span>
      <span className="text-gray-400">{Math.round(tempMin)}°{unidad}</span>
    </div>
  </div>
  );
}
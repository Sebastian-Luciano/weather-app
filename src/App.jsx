import React, { useEffect } from 'react';
import MostrarClima from './components/MostrarClima';
import TarjetaPronostico from './components/TarjetaPronostico';
import TarjetaDestacada from './components/TarjetaDestacada';
import { useClimaSearch } from './context/ClimaSearchContext';

export default function App() {
  const { pronostico, climaActual, cambiarUnidad, unidad, error, actualizarClima } = useClimaSearch();

  useEffect(() => {
    actualizarClima('Helsinki');
  }, [actualizarClima]);

  if (error) {
    return <div className="text-white text-center p-4">{error}</div>;
  }

  if (!climaActual || !pronostico) {
    return <div className="text-white text-center p-4">Cargando...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#100E1D] text-white font-raleway">
      <div className="mx-auto flex flex-col lg:flex-row lg:max-w-[1440px] lg:h-[1023px]">
        <div className="w-full lg:w-[459px] h-[810px] lg:h-full mb-8 lg:mb-0">
          <MostrarClima />
        </div>
        <div className="flex flex-col items-center justify-start w-full lg:w-[981px] p-4 lg:p-8">
          <div className="w-full max-w-[375px] md:max-w-[768px] lg:max-w-none">
            <div className="flex justify-end mb-8">
              <div className="font-bold text-[18px] flex">
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
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
              {pronostico && pronostico.list && pronostico.list.slice(0, 5).map((dia, index) => (
                <TarjetaPronostico key={index} dia={dia} index={index} />
              ))}
            </div>
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-8">Today's Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                {climaActual && (
                  <>
                    <TarjetaDestacada
                      titulo='Wind status'
                      valor={climaActual.wind}
                      tipo='viento'
                    />
                    <TarjetaDestacada
                      titulo='Humidity'
                      valor={climaActual.main.humidity}
                      tipo='humedad'
                    />
                    <TarjetaDestacada
                      titulo='Visibility'
                      valor={climaActual.visibility}
                      tipo='visibilidad'
                    />
                    <TarjetaDestacada
                      titulo='Air Pressure'
                      valor={climaActual.main.pressure}
                      tipo='presion'
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-white text-center pt-40">
            <p>created by Sebastian - devChallenges.io</p>
          </div>
        </div>

      </div>
    </div>
  );
}
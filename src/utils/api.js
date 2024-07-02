const API_KEY = 'dafe7f1fc895ee3ede5e3d02fae1ef6e';

export const obtenerClima = async (ciudad) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`;
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error('No se pudo obtener el clima');
  }
  const datos = await respuesta.json();
  return datos;
};

export const obtenerPronostico = async (ciudad) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${API_KEY}&units=metric`;
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error('No se pudo obtener el pronóstico');
  }
  const datos = await respuesta.json();
  return datos;
};
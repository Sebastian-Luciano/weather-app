const API_KEY = 'dafe7f1fc895ee3ede5e3d02fae1ef6e';
const obtenerClimaConReintento = async (url, intentos = 3) => {
  for (let i = 0; i < intentos; i++) {
     try { 
      const respuesta = await fetch(url);
      if (!respuesta.ok) {
        throw new Error('No se pudo obtener el clima');
      }
      return await respuesta.json();
    } catch (error) {
      if (i === intentos - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo antes de reintentar
    } 
  }
};

export const obtenerClima = async (ubicacion) => {
  const isCoordinates = ubicacion.includes(',');
  
  const url = isCoordinates
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${ubicacion.split(',')[0]}&lon=${ubicacion.split(',')[1]}&appid=${API_KEY}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?q=${ubicacion}&appid=${API_KEY}&units=metric`;
  
  return obtenerClimaConReintento(url);
};

export const obtenerLocaciones = async (searchTerm) => {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${API_KEY}`);
  const data = await response.json();
  return await Promise.all(data.map(async (result) => {
    const countryResponse = await fetch(`https://restcountries.com/v3.1/alpha/${result.country}`);
    const countryData = await countryResponse.json();
    return { ...result, fullCountryName: countryData[0].name.common };
  }));
};

export const obtenerPronostico = async (ubicacion) => {
  const isCoordinates = ubicacion.includes(',');
  const url = isCoordinates
    ? `https://api.openweathermap.org/data/2.5/forecast?lat=${ubicacion.split(',')[0]}&lon=${ubicacion.split(',')[1]}&appid=${API_KEY}&units=metric`
    : `https://api.openweathermap.org/data/2.5/forecast?q=${ubicacion}&appid=${API_KEY}&units=metric`;
  
  return obtenerClimaConReintento(url);
};



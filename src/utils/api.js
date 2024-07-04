const API_KEY = '60a1ab97a59af9b80990046416c23043'
// Función para obtener datos del caché
const obtenerDelCache = (key) => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    // Verificar si el caché ha expirado (después de 30 minutos)
    if (Date.now() - timestamp < 30 * 60 * 1000) {
      return data;
    }
  }
  return null;
};

// Función para guardar datos en el caché
const guardarEnCache = (key, data) => {
  const cacheData = {
    data: data,
    timestamp: Date.now()
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

const obtenerClimaConReintento = async (url, intentos = 3) => {
  for (let i = 0; i < intentos; i++) {
    try { 
      const respuesta = await fetch(url);
      if (respuesta.status === 429) {
        // Esperar más tiempo antes de reintentar
        await new Promise(resolve => setTimeout(resolve, 5000 * (i + 1)));
        continue;
      }
      if (!respuesta.ok) {
        throw new Error('No se pudo obtener el clima');
      }
      return await respuesta.json();
    } catch (error) {
      if (i === intentos - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
    } 
  }
};

export const obtenerClima = async (ubicacion) => {
  const cacheKey = `clima_${ubicacion}`;
  const cachedData = obtenerDelCache(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  const isCoordinates = ubicacion.includes(',');
  const url = isCoordinates
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${ubicacion.split(',')[0]}&lon=${ubicacion.split(',')[1]}&appid=${API_KEY}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?q=${ubicacion}&appid=${API_KEY}&units=metric`;
  
  const data = await obtenerClimaConReintento(url);
  guardarEnCache(cacheKey, data);
  return data;
};

export const obtenerLocaciones = async (searchTerm) => {
  const cacheKey = `locaciones_${searchTerm}`;
  const cachedData = obtenerDelCache(cacheKey);

  if (cachedData) {
    console.log('Locaciones obtenidas del caché');
    return cachedData;
  }

  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${API_KEY}`);
  const data = await response.json();
  const locationsWithCountry = await Promise.all(data.map(async (result) => {
    const countryResponse = await fetch(`https://restcountries.com/v3.1/alpha/${result.country}`);
    const countryData = await countryResponse.json();
    return { ...result, fullCountryName: countryData[0].name.common };
  }));

  guardarEnCache(cacheKey, locationsWithCountry);
  return locationsWithCountry;
};

export const obtenerPronostico = async (ubicacion) => {
  const cacheKey = `pronostico_${ubicacion}`;
  const cachedData = obtenerDelCache(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const isCoordinates = ubicacion.includes(',');
  const url = isCoordinates
    ? `https://api.openweathermap.org/data/2.5/forecast?lat=${ubicacion.split(',')[0]}&lon=${ubicacion.split(',')[1]}&appid=${API_KEY}&units=metric`
    : `https://api.openweathermap.org/data/2.5/forecast?q=${ubicacion}&appid=${API_KEY}&units=metric`;
  
  const data = await obtenerClimaConReintento(url);
  guardarEnCache(cacheKey, data);
  return data;
};
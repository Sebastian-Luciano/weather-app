import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClimaProvider } from './context/ClimaContext.jsx'
import { ImagenProvider } from './context/ImagenContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClimaProvider>
      <ImagenProvider>
      <App />
      </ImagenProvider>
    </ClimaProvider>
  </React.StrictMode>,
)
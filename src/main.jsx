import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Asegúrate de importar Router
import App from './App'; // Asegúrate de que el archivo App.jsx esté en la ruta correcta
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router> {/* Envuelve tu aplicación con Router */}
    <App />
  </Router>
);

import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CrearGrupo from './Components/GrupoManager'; // Página para crear grupos
import GestionGrupo from './Components/GestionMiembros'; // Página para gestionar un grupo

function App() {
  return (
    <div>
      <Routes>
        {/* Página de creación de grupos */}
        <Route path="/" element={<CrearGrupo />} />

        {/* Página de gestión de un grupo específico */}
        <Route path="/grupo/:grupoId" element={<GestionGrupo />} />
      </Routes>
    </div>
  );
}

export default App;


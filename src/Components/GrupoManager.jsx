import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GrupoManager.css';
import GrupoCreacion from './GrupoCreacion';

function CrearGrupo() {
  const [grupos, setGrupos] = useState(
    JSON.parse(localStorage.getItem('grupos')) || []
  );
  const [mostrarCreacion, setMostrarCreacion] = useState(false);
  const navigate = useNavigate();

  const handleGroupClick = (grupoId) => {
    navigate(`/grupo/${grupoId}`);
  };

  const handleGroupsUpdated = (updatedGrupos) => {
    setGrupos(updatedGrupos);
  };

  return (
    <div className="gm-page">
      <h1 className="gm-header">Mis grupos</h1>

      <h2 className="gm-subtitle">Viajes creados</h2>

      <div className="gm-groups">
        {grupos.map((grupo, index) => (
          <div key={grupo.id} className="gm-card">
            <div className="gm-card-main">
              <div className="gm-card-name">{grupo.nombre}</div>
              <div className="gm-card-sub">Toca para gestionar</div>
              <button
                className="gm-btn-ver"
                onClick={() => handleGroupClick(grupo.id)}
              >
                Ver
              </button>
            </div>
            <div className="gm-card-count">{index + 1}</div>
          </div>
        ))}

        {grupos.length === 0 && (
          <p className="gm-empty">Todavía no has creado ningún grupo.</p>
        )}
      </div>

      {/* Botón que despliega / oculta el formulario */}
      <button
        className="gm-btn-nuevo"
        onClick={() => setMostrarCreacion((prev) => !prev)}
      >
        {mostrarCreacion ? 'Cerrar creación' : 'Nuevo grupo'}
      </button>

      {mostrarCreacion && (
        <GrupoCreacion onGroupsUpdated={handleGroupsUpdated} />
      )}
    </div>
  );
}

export default CrearGrupo;

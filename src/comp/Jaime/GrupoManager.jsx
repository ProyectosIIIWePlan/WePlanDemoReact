import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GrupoManager.css';
import Navbar from "/src/components/Mario/Navbar.jsx";
import GrupoCreacion from './GrupoCreacion.jsx';

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
      <Navbar admin={null} groupId={null} gestName={"WEPLAN"} arrow={false} />
      <h1 className="gm-header">Mis grupos</h1>

      <div className="gm-groups">
        {grupos.map((grupo, index) => (
          <div key={grupo.id} className="gm-card">
            <div className="gm-card-main">
              <div className="gm-card-name" onClick={() => navigate(`/gestiones/${grupo.id}`)}>{grupo.nombre}</div>
              <button
                className="gm-btn-ver"
                onClick={() => handleGroupClick(grupo.id)}
              >
                Editar
              </button>
            </div>
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

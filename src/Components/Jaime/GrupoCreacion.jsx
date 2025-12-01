import React, { useState } from 'react';

function GrupoCreacion({ onGroupsUpdated }) {
  const [grupoNombre, setGrupoNombre] = useState('');
  const [nuevoMiembro, setNuevoMiembro] = useState('');
  const [miembros, setMiembros] = useState([]);

  const agregarMiembro = () => {
    if (nuevoMiembro.trim() === '') return;
    setMiembros((prev) => [...prev, nuevoMiembro.trim()]);
    setNuevoMiembro('');
  };

  const eliminarMiembro = (nombre) => {
    setMiembros((prev) => prev.filter((m) => m !== nombre));
  };

  const handleCreateGroup = () => {
    if (grupoNombre.trim() === ''){
        alert("El nombre del grupo no puede estar vacío.");
        return;
    }

    const grupos = JSON.parse(localStorage.getItem('grupos')) || [];
    const newGrupo = { id: Date.now(), nombre: grupoNombre.trim() };
    const updatedGrupos = [...grupos, newGrupo];

    // Guardar grupo
    localStorage.setItem('grupos', JSON.stringify(updatedGrupos));

    // Guardar miembros iniciales de ese grupo
    localStorage.setItem(`miembros-${newGrupo.id}`, JSON.stringify(miembros));

    // Notificar al padre
    if (onGroupsUpdated) onGroupsUpdated(updatedGrupos);

    // Reset formulario
    setGrupoNombre('');
    setMiembros([]);
    setNuevoMiembro('');
  };

  return (
    <div className="gm-create-panel">
      <h3 className="gm-create-title">Crear nuevo grupo</h3>

      {/* Nombre del grupo */}
      <div className="gm-create-row">
        <input
          type="text"
          className="gm-input"
          value={grupoNombre}
          onChange={(e) => setGrupoNombre(e.target.value)}
          placeholder="Nombre del grupo"
          //make it pop if null or empty when trying to create
            required={true}
        />
      </div>

      {/* Lista de miembros ya añadidos */}
      {miembros.length > 0 && (
        <div className="gm-members-list">
          {miembros.map((m) => (
            <div key={m} className="gm-member-pill">
              <span>{m}</span>
              <button
                className="gm-member-remove"
                onClick={() => eliminarMiembro(m)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Añadir miembro */}
      <div className="gm-members-row">
        <input
          type="text"
          className="gm-input"
          value={nuevoMiembro}
          onKeyDown={(k) => {k.key === 'Enter' ? agregarMiembro() : null}}
          onChange={(e) => setNuevoMiembro(e.target.value)}
          placeholder="Añadir integrante"
        />
        <button className="gm-add-btn" onClick={agregarMiembro}>
          +
        </button>
      </div>

      {/* Botón final para crear el grupo */}
      <button className="gm-create-btn" onClick={handleCreateGroup}>
        Crear grupo
      </button>
    </div>
  );
}

export default GrupoCreacion;

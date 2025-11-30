import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GestionMiembros.css'
function GestionGrupo() {
  const { grupoId } = useParams();
  const navigate = useNavigate();
  const [grupo, setGrupo] = useState(null);
  const [miembros, setMiembros] = useState([]); // Miembros del grupo
  const [nuevoMiembro, setNuevoMiembro] = useState(''); // Miembro a añadir

  useEffect(() => {
    // Cargar los grupos desde localStorage
    const grupos = JSON.parse(localStorage.getItem('grupos')) || [];
    const grupoEncontrado = grupos.find((g) => g.id === parseInt(grupoId));
    if (grupoEncontrado) {
      setGrupo(grupoEncontrado);
      
      // Cargar los miembros del grupo desde localStorage
      const miembrosGrupo = JSON.parse(localStorage.getItem(`miembros-${grupoId}`)) || [];
      setMiembros(miembrosGrupo);  // Establecer los miembros del grupo
    }
  }, [grupoId]);

  const handleDeleteGroup = () => {
    const grupos = JSON.parse(localStorage.getItem('grupos')) || [];
    const gruposActualizados = grupos.filter((g) => g.id !== parseInt(grupoId));
    localStorage.setItem('grupos', JSON.stringify(gruposActualizados));

    // Eliminar los miembros del grupo también
    localStorage.removeItem(`miembros-${grupoId}`);
    
    navigate('/'); // Volver a la página principal de crear grupos
  };

  const agregarMiembro = () => {
    if (nuevoMiembro.trim() !== '') {
      const nuevosMiembros = [...miembros, nuevoMiembro];
      setMiembros(nuevosMiembros);
      setNuevoMiembro('');
      
      // Guardar los miembros en localStorage
      localStorage.setItem(`miembros-${grupoId}`, JSON.stringify(nuevosMiembros));
    }
  };

  const eliminarMiembro = (miembro) => {
    const miembrosActualizados = miembros.filter((m) => m !== miembro);
    setMiembros(miembrosActualizados);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem(`miembros-${grupoId}`, JSON.stringify(miembrosActualizados));
  };

  if (!grupo) {
    return <div>Cargando...</div>;
  }

  return (
  <div className="gestion-grupo">

    {/* NAVBAR SUPERIOR */}
    <div className="gm-navbar">
      <button className="gm-back-btn" onClick={() => navigate('/')}>
        ← {/* /mario/LeftArrow.png */}
      </button>

      <span className="gm-navbar-title">
        Gestión del grupo: {grupo.nombre}
      </span>
    </div>

    {/* CONTENIDO PRINCIPAL */}
    <div className="gm-content">
      <h2 className="gg-subtitulo">Miembros</h2>

      <div className="miembros">
        {miembros.map((miembro, index) => (
          <div className="miembro" key={index}>
            <span>{miembro}</span>
            <button className="eliminar-btn" onClick={() => eliminarMiembro(miembro)}>
              x
            </button>
          </div>
        ))}
      </div>

      <div className="agregar-miembro">
        <input
          type="text"
          value={nuevoMiembro}
          onChange={(e) => setNuevoMiembro(e.target.value)}
          placeholder="Añadir miembro"
        />
        <button className="btn-circle" onClick={agregarMiembro}>+</button>
      </div>

      <div className="gg-botones">
        <button className="btn-danger" onClick={handleDeleteGroup}>
          Eliminar viaje
        </button>
      </div>
    </div>

  </div>
);
}

export default GestionGrupo;

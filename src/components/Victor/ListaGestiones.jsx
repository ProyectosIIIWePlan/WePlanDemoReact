// src/components/Victor/ListaGestiones.jsx
import { useState } from "react";
import NavbarGestiones from "./NavbarGestiones";
import GestionCard from "./GestionCard";
import ModalAñadirGestion from "./ModalAñadirGestion";
import ModalEditarGestion from "./ModalEditarGestion";
import ModalPagosGestion from "./ModalPagosGestion";
import "./ListaGestiones.css";

function ListaGestiones() {
  const [gestiones, setGestiones] = useState([]);
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [gestionEditar, setGestionEditar] = useState(null);
  const [gestionPagos, setGestionPagos] = useState(null);

  const abrirModalCrear = () => setMostrarModalCrear(true);
  const cerrarModalCrear = () => setMostrarModalCrear(false);

  const abrirModalEditar = (gestion) => setGestionEditar(gestion);
  const cerrarModalEditar = () => setGestionEditar(null);

  const abrirModalPagos = (gestion) => setGestionPagos(gestion);
  const cerrarModalPagos = () => setGestionPagos(null);

  const handleCrearGestion = (nuevaGestion) => {
    setGestiones((prev) => [nuevaGestion, ...prev]);
  };

  const handleActualizarGestion = (gestionActualizada) => {
    setGestiones((prev) =>
      prev.map((g) => (g.id === gestionActualizada.id ? gestionActualizada : g))
    );
  };

  const handleActualizarPagos = (gestionConPagos) => {
    setGestiones((prev) =>
      prev.map((g) => (g.id === gestionConPagos.id ? gestionConPagos : g))
    );
  };

  return (
    <div className="lista-gestiones-page">
      <NavbarGestiones />

      <main className="lista-gestiones-contenido">
        {gestiones.length === 0 && (
          <p className="mensaje-sin-gestiones">
            Aún no hay gestiones creadas. Pulsa el botón + para añadir una.
          </p>
        )}

        {gestiones.map((gestion) => (
          <GestionCard
            key={gestion.id}
            gestion={gestion}
            onEditar={abrirModalEditar}
            onPagos={abrirModalPagos}
          />
        ))}
      </main>

      <button
        className="boton-flotante-aniadir"
        onClick={abrirModalCrear}
      >
        +
      </button>

      {mostrarModalCrear && (
        <ModalAñadirGestion
          onClose={cerrarModalCrear}
          onCrearGestion={handleCrearGestion}
        />
      )}

      {gestionEditar && (
        <ModalEditarGestion
          gestion={gestionEditar}
          onClose={cerrarModalEditar}
          onGuardar={handleActualizarGestion}
        />
      )}

      {gestionPagos && (
        <ModalPagosGestion
          gestion={gestionPagos}
          onClose={cerrarModalPagos}
          onActualizarPagos={handleActualizarPagos}
        />
      )}
    </div>
  );
}

export default ListaGestiones;

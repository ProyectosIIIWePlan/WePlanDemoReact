// src/components/Victor/ModalPagosGestion.jsx
import { useState } from "react";
import "./ListaGestiones.css";

function ModalPagosGestion({ gestion, onClose, onActualizarPagos }) {
  const [participantes, setParticipantes] = useState(
    gestion.participantes || []
  );

  const total =
    gestion.tipo === "viaje"
      ? Number(gestion.costeTotal || 0)
      : Number(gestion.cantidadTotal || 0);

  const totalPagado = participantes.reduce(
    (acc, p) => acc + (p.haPagado ? p.debePagar : 0),
    0
  );
  const restante = Math.max(total - totalPagado, 0);
  const pagados = participantes.filter((p) => p.haPagado).length;

  const togglePago = (id) => {
    setParticipantes((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, haPagado: !p.haPagado } : p
      )
    );
  };

  const handleGuardar = () => {
    const gestionActualizada = {
      ...gestion,
      participantes,
      participantesPagados: pagados,
    };
    onActualizarPagos(gestionActualizada);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h2>Gestionar pagos</h2>
        {total > 0 && (
          <p className="resumen-pagos">
            Total: {total} € · Pagado: {totalPagado.toFixed(2)} € · Restante:{" "}
            {restante.toFixed(2)} €
          </p>
        )}

        {participantes.length === 0 && (
          <p className="mensaje-sin-gestiones">
            No hay participantes definidos para esta gestión.
          </p>
        )}

        <ul className="lista-participantes">
          {participantes.map((p) => (
            <li key={p.id} className="participante-item">
              <div>
                <p className="participante-nombre">{p.nombre}</p>
                <p className="participante-detalle">
                  Debe pagar: {p.debePagar} €
                </p>
              </div>
              <button
                type="button"
                className={
                  p.haPagado
                    ? "participante-boton pagado"
                    : "participante-boton pendiente"
                }
                onClick={() => togglePago(p.id)}
              >
                {p.haPagado ? "Pagado" : "Pagar su parte"}
              </button>
            </li>
          ))}
        </ul>

        <button className="modal-boton-opcion" onClick={handleGuardar}>
          Guardar pagos
        </button>
        <button className="modal-boton-cerrar" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ModalPagosGestion;

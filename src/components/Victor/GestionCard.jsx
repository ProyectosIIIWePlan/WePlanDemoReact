// src/components/Victor/GestionCard.jsx
import "./ListaGestiones.css";

function GestionCard({ gestion, onEditar, onPagos, onEliminar }) {
  // Extraemos datos principales
  const {
    id,
    tipo = "viaje",
    nombre,
    hoteles = [],
    transportes = [],
    participantes = [],
    participantesTotales
  } = gestion;

  // Total según tipo
  const total =
    tipo === "viaje"
      ? Number(gestion.costeTotal || 0)
      : Number(gestion.cantidadTotal || 0);

  // Pagado por participantes
  const pagado = participantes.reduce(
    (acc, p) => acc + (p.haPagado ? Number(p.debePagar) : 0),
    0
  );

  const restante = Math.max(total - pagado, 0);
  const numParticipantes = participantesTotales ?? participantes.length;

  // Estado visual
  let estado = "pendiente";
  if (total > 0) {
    if (pagado >= total) estado = "completa";
    else if (pagado > 0) estado = "parcial";
  }

  return (
    <div className={`gestion-card gestion-card-${estado} card-anim`}>

      {/* HEADER */}
      <div className="gestion-card-header">
        <h3 className="gestion-titulo">{nombre}</h3>

        <span
          className={`gestion-tipo ${
            tipo === "viaje" ? "badge-viaje" : "badge-bote"
          }`}
        >
          {tipo === "viaje" ? "Viaje" : "Bote"}
        </span>
      </div>

      {/* INFORMACIÓN PRINCIPAL */}
      <div className="gestion-detalles-viaje">
        <span>
          <span className="detalle-label">Total:</span> {total.toFixed(2)} €
        </span>

        <span>
          <span className="detalle-label">Pagado:</span> {pagado.toFixed(2)} €
        </span>

        {total > 0 && (
          <span>
            <span className="detalle-label">Restante:</span> {restante.toFixed(2)} €
          </span>
        )}

        <span className="detalle-extra">
          {numParticipantes} participantes
        </span>
      </div>

      {/* SECCIÓN DE HOTELES */}
      {tipo === "viaje" && hoteles.length > 0 && (
        <div className="gestion-detalles-viaje">
          <span className="detalle-label">Hoteles:</span>

          {hoteles.map((h) => (
            <span key={h.id} className="detalle-extra">
              • {h.nombre || "Hotel sin nombre"} — {h.entrada} → {h.salida}
            </span>
          ))}
        </div>
      )}

      {/* SECCIÓN DE TRANSPORTES */}
      {tipo === "viaje" && transportes.length > 0 && (
        <div className="gestion-detalles-viaje">
          <span className="detalle-label">Transportes:</span>

          {transportes.map((t) => (
            <span key={t.id} className="detalle-extra">
              • {t.tipo || "Transporte"} — {t.fecha}
            </span>
          ))}
        </div>
      )}

      {/* BOTONES */}
      <div className="gestion-botones">
        <button
          className="gestion-boton-acceder"
          onClick={() => onPagos(gestion)}
        >
          Pagos
        </button>

        <button
          className="gestion-boton-secundario"
          onClick={() => onEditar(gestion)}
        >
          Editar
        </button>

        {onEliminar && (
          <button
            className="gestion-boton-eliminar"
            onClick={() => onEliminar(id)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}

export default GestionCard;

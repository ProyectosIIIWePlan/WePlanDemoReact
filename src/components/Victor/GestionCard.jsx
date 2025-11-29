// src/components/Victor/GestionCard.jsx

function GestionCard({ gestion, onEditar, onPagos }) {
  const esViaje = gestion.tipo === "viaje";

  const participantes = gestion.participantes || [];
  const totalPersonas =
    participantes.length || gestion.participantesTotales || 0;

  const total =
    esViaje ? Number(gestion.costeTotal || 0) : Number(gestion.cantidadTotal || 0);

  const pagados = participantes.filter((p) => p.haPagado).length;
  const totalPagado = participantes.reduce(
    (acc, p) => acc + (p.haPagado ? p.debePagar : 0),
    0
  );
  const restante = Math.max(total - totalPagado, 0);

  let estadoClass = "";
  if (total > 0 && totalPersonas > 0) {
    if (restante <= 0) {
      estadoClass = "gestion-card-completa";
    } else if (pagados > 0) {
      estadoClass = "gestion-card-parcial";
    } else {
      estadoClass = "gestion-card-pendiente";
    }
  }

  return (
    <article className={`gestion-card card-anim ${estadoClass}`}>
      <div className="gestion-card-header">
        <h3 className="gestion-titulo">{gestion.nombre}</h3>

        <span
          className={`gestion-tipo ${
            esViaje ? "badge-viaje" : "badge-bote"
          }`}
        >
          {esViaje ? "Viaje" : "Bote"}
        </span>
      </div>

      <div className="gestion-detalles-viaje">
        {esViaje ? (
          <>
            <p>
              <span className="detalle-label">Hotel:</span>{" "}
              {gestion.hotel || "Sin especificar"}
            </p>
            <p>
              <span className="detalle-label">Transporte:</span>{" "}
              {gestion.transporte || "Sin especificar"}
            </p>
            <p>
              <span className="detalle-label">Coste total:</span>{" "}
              <span className="detalle-cantidad">{total} €</span>
            </p>
          </>
        ) : (
          <p>
            <span className="detalle-label">Cantidad total:</span>{" "}
            <span className="detalle-cantidad">{total} €</span>
          </p>
        )}

        {totalPersonas > 0 && (
          <>
            <p>
              <span className="detalle-label">Pagado:</span>{" "}
              {pagados} / {totalPersonas} personas
            </p>
            {total > 0 && (
              <p>
                <span className="detalle-label">Restante:</span>{" "}
                <span className="detalle-cantidad">
                  {restante.toFixed(2)} €
                </span>
              </p>
            )}
          </>
        )}
      </div>

      <div className="gestion-botones">
        <button
          className="gestion-boton-secundario"
          type="button"
          onClick={() => onEditar(gestion)}
        >
          Editar
        </button>
        <button
          className="gestion-boton-acceder"
          type="button"
          onClick={() => onPagos(gestion)}
        >
          Gestionar pagos
        </button>
      </div>
    </article>
  );
}

export default GestionCard;

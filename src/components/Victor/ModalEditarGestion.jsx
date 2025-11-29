// src/components/Victor/ModalEditarGestion.jsx
import { useState } from "react";
import "./ListaGestiones.css";

function ModalEditarGestion({ gestion, onClose, onGuardar }) {
  const esViaje = gestion.tipo === "viaje";

  const [form, setForm] = useState({
    nombre: gestion.nombre,
    hotel: gestion.hotel || "",
    transporte: gestion.transporte || "",
    costeTotal: gestion.costeTotal || "",
    cantidadTotal: gestion.cantidadTotal || "",
    participantesTotales:
      gestion.participantes?.length || gestion.participantesTotales || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const participantesTotales = Number(form.participantesTotales || 0);
    const coste =
      esViaje
        ? Number(form.costeTotal || 0)
        : Number(form.cantidadTotal || 0);

    let participantes = gestion.participantes || [];

    // Si cambia el número, regeneramos todos
    if (participantesTotales !== participantes.length) {
      participantes =
        participantesTotales > 0 && coste > 0
          ? Array.from({ length: participantesTotales }, (_, i) => {
              const debe = Number(
                (coste / participantesTotales).toFixed(2)
              );
              return {
                id: i + 1,
                nombre: `Persona ${i + 1}`,
                debePagar: debe,
                haPagado: false,
              };
            })
          : [];
    } else {
      // Mantener mismos participantes, solo recalcular lo que deben
      participantes = participantes.map((p, index) => ({
        ...p,
        nombre: p.nombre || `Persona ${index + 1}`,
        debePagar:
          participantesTotales > 0 && coste > 0
            ? Number((coste / participantesTotales).toFixed(2))
            : 0,
      }));
    }

    const gestionActualizada = {
      ...gestion,
      nombre: form.nombre,
      participantesTotales,
      participantes,
      ...(esViaje
        ? {
            hotel: form.hotel,
            transporte: form.transporte,
            costeTotal: coste,
          }
        : {
            cantidadTotal: coste,
          }),
    };

    onGuardar(gestionActualizada);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h2>Editar gestión</h2>

        <form className="modal-formulario" onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </label>

          {esViaje ? (
            <>
              <label>
                Hotel:
                <input
                  type="text"
                  name="hotel"
                  value={form.hotel}
                  onChange={handleChange}
                />
              </label>

              <label>
                Transporte:
                <input
                  type="text"
                  name="transporte"
                  value={form.transporte}
                  onChange={handleChange}
                />
              </label>

              <label>
                Coste total (€):
                <input
                  type="number"
                  name="costeTotal"
                  value={form.costeTotal}
                  onChange={handleChange}
                />
              </label>
            </>
          ) : (
            <label>
              Cantidad total (€):
              <input
                type="number"
                name="cantidadTotal"
                value={form.cantidadTotal}
                onChange={handleChange}
              />
            </label>
          )}

          <label>
            Número de participantes:
            <input
              type="number"
              name="participantesTotales"
              min="1"
              value={form.participantesTotales}
              onChange={handleChange}
            />
          </label>

          <p className="texto-division">
            Al guardar se recalculará la cantidad por persona de forma
            igualitaria.
          </p>

          <button className="modal-boton-opcion" type="submit">
            Guardar cambios
          </button>
        </form>

        <button className="modal-boton-cerrar" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ModalEditarGestion;

// src/components/Victor/ModalAñadirGestion.jsx
import { useState } from "react";
import "./ListaGestiones.css";

function ModalAñadirGestion({ onClose, onCrearGestion }) {
  const [tipo, setTipo] = useState("viaje");

  const [form, setForm] = useState({
    nombre: "",
    hotel: "",
    transporte: "",
    costeTotal: "",
    cantidadTotal: "",
    participantesTotales: 1,
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

    if (!form.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    const participantesTotales = Number(form.participantesTotales || 0);
    const coste =
      tipo === "viaje"
        ? Number(form.costeTotal || 0)
        : Number(form.cantidadTotal || 0);

    const participantes =
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

    const base = {
      id: Date.now(),
      tipo,
      nombre: form.nombre,
      participantesTotales,
      participantesPagados: 0,
      participantes,
    };

    const nuevaGestion =
      tipo === "viaje"
        ? {
            ...base,
            hotel: form.hotel,
            transporte: form.transporte,
            costeTotal: coste,
          }
        : {
            ...base,
            cantidadTotal: coste,
          };

    onCrearGestion(nuevaGestion);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h2>Crear nueva gestión</h2>

        <div className="modal-tipo-selector">
          <button
            className={tipo === "viaje" ? "tipo-activo" : ""}
            type="button"
            onClick={() => setTipo("viaje")}
          >
            Viaje
          </button>
          <button
            className={tipo === "bote" ? "tipo-activo" : ""}
            type="button"
            onClick={() => setTipo("bote")}
          >
            Bote
          </button>
        </div>

        <form className="modal-formulario" onSubmit={handleSubmit}>
          <label>
            Nombre de la gestión:
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej. Viaje a Berlín / Bote cena"
              required
            />
          </label>

          {tipo === "viaje" ? (
            <>
              <label>
                Hotel:
                <input
                  type="text"
                  name="hotel"
                  value={form.hotel}
                  onChange={handleChange}
                  placeholder="Ej. Hotel Ibis"
                />
              </label>

              <label>
                Transporte:
                <input
                  type="text"
                  name="transporte"
                  value={form.transporte}
                  onChange={handleChange}
                  placeholder="Ej. Avión"
                />
              </label>

              <label>
                Coste total del viaje (€):
                <input
                  type="number"
                  name="costeTotal"
                  min="0"
                  value={form.costeTotal}
                  onChange={handleChange}
                  placeholder="Ej. 400"
                />
              </label>
            </>
          ) : (
            <label>
              Cantidad total del bote (€):
              <input
                type="number"
                name="cantidadTotal"
                min="0"
                value={form.cantidadTotal}
                onChange={handleChange}
                placeholder="Ej. 80"
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
              placeholder="Ej. 4"
            />
          </label>

          <p className="texto-division">
            La cantidad se dividirá a partes iguales entre los participantes.
          </p>

          <button type="submit" className="modal-boton-opcion">
            Crear gestión
          </button>
        </form>

        <button className="modal-boton-cerrar" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ModalAñadirGestion;

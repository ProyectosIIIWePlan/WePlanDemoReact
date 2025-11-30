// src/components/Victor/ModalAñadirGestion.jsx
import { useState } from "react";
import "./ListaGestiones.css";

function ModalAñadirGestion({ onClose, onCrearGestion }) {
  const [tipo, setTipo] = useState("viaje");

  const [form, setForm] = useState({
    nombre: "",
    costeTotal: "",
    cantidadTotal: "",
    participantesTotales: 1,
    hoteles: [
      { id: 1, nombre: "", entrada: "", salida: "" },
    ],
    transportes: [
      { id: 1, tipo: "", fecha: "" },
    ],
  });

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHotelChange = (index, campo, valor) => {
    setForm((prev) => {
      const nuevos = prev.hoteles.map((h, i) =>
        i === index ? { ...h, [campo]: valor } : h
      );
      return { ...prev, hoteles: nuevos };
    });
  };

  const handleTransporteChange = (index, campo, valor) => {
    setForm((prev) => {
      const nuevos = prev.transportes.map((t, i) =>
        i === index ? { ...t, [campo]: valor } : t
      );
      return { ...prev, transportes: nuevos };
    });
  };

  const añadirHotel = () => {
    setForm((prev) => ({
      ...prev,
      hoteles: [
        ...prev.hoteles,
        {
          id: Date.now(),
          nombre: "",
          entrada: "",
          salida: "",
        },
      ],
    }));
  };

  const añadirTransporte = () => {
    setForm((prev) => ({
      ...prev,
      transportes: [
        ...prev.transportes,
        {
          id: Date.now(),
          tipo: "",
          fecha: "",
        },
      ],
    }));
  };

  const eliminarHotel = (index) => {
    setForm((prev) => ({
      ...prev,
      hoteles: prev.hoteles.filter((_, i) => i !== index),
    }));
  };

  const eliminarTransporte = (index) => {
    setForm((prev) => ({
      ...prev,
      transportes: prev.transportes.filter((_, i) => i !== index),
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

    // Participantes con división igualitaria
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

    // Filtrar hoteles/transportes vacíos
    const hotelesLimpios = form.hoteles
      .map((h, idx) => ({
        id: h.id || idx + 1,
        nombre: h.nombre.trim(),
        entrada: h.entrada || "",
        salida: h.salida || "",
      }))
      .filter(
        (h) =>
          h.nombre !== "" || h.entrada !== "" || h.salida !== ""
      );

    const transportesLimpios = form.transportes
      .map((t, idx) => ({
        id: t.id || idx + 1,
        tipo: t.tipo.trim(),
        fecha: t.fecha || "",
      }))
      .filter((t) => t.tipo !== "" || t.fecha !== "");

    const nuevaGestion =
      tipo === "viaje"
        ? {
            ...base,
            costeTotal: coste,
            hoteles: hotelesLimpios,
            transportes: transportesLimpios,
          }
        : {
            ...base,
            cantidadTotal: coste,
            hoteles: [],
            transportes: [],
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
              onChange={handleBasicChange}
              placeholder="Ej. Viaje a Berlín / Bote cena"
              required
            />
          </label>

          {tipo === "viaje" ? (
            <>
              <p className="subseccion-titulo">Hoteles</p>
              {form.hoteles.map((hotel, index) => (
                <div
                  className="grupo-campo-multiple"
                  key={hotel.id ?? index}
                >
                  <label>
                    Nombre del hotel:
                    <input
                      type="text"
                      value={hotel.nombre}
                      onChange={(e) =>
                        handleHotelChange(
                          index,
                          "nombre",
                          e.target.value
                        )
                      }
                      placeholder="Ej. Hotel Melia"
                    />
                  </label>

                  <div className="fila-fechas">
                    <label>
                      Entrada:
                      <input
                        type="date"
                        value={hotel.entrada}
                        onChange={(e) =>
                          handleHotelChange(
                            index,
                            "entrada",
                            e.target.value
                          )
                        }
                      />
                    </label>
                    <label>
                      Salida:
                      <input
                        type="date"
                        value={hotel.salida}
                        onChange={(e) =>
                          handleHotelChange(
                            index,
                            "salida",
                            e.target.value
                          )
                        }
                      />
                    </label>
                  </div>

                  {form.hoteles.length > 1 && (
                    <button
                      type="button"
                      className="boton-mini"
                      onClick={() => eliminarHotel(index)}
                    >
                      Quitar hotel
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="boton-mini boton-mini-secundario"
                onClick={añadirHotel}
              >
                + Añadir otro hotel
              </button>

              <p className="subseccion-titulo">Transportes</p>
              {form.transportes.map((trans, index) => (
                <div
                  className="grupo-campo-multiple"
                  key={trans.id ?? index}
                >
                  <label>
                    Tipo de transporte:
                    <input
                      type="text"
                      value={trans.tipo}
                      onChange={(e) =>
                        handleTransporteChange(
                          index,
                          "tipo",
                          e.target.value
                        )
                      }
                      placeholder="Ej. Avión, tren…"
                    />
                  </label>

                  <label>
                    Fecha:
                    <input
                      type="date"
                      value={trans.fecha}
                      onChange={(e) =>
                        handleTransporteChange(
                          index,
                          "fecha",
                          e.target.value
                        )
                      }
                    />
                  </label>

                  {form.transportes.length > 1 && (
                    <button
                      type="button"
                      className="boton-mini"
                      onClick={() => eliminarTransporte(index)}
                    >
                      Quitar transporte
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="boton-mini boton-mini-secundario"
                onClick={añadirTransporte}
              >
                + Añadir otro transporte
              </button>

              <label>
                Coste total del viaje (€):
                <input
                  type="number"
                  name="costeTotal"
                  min="0"
                  value={form.costeTotal}
                  onChange={handleBasicChange}
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
                onChange={handleBasicChange}
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
              onChange={handleBasicChange}
              placeholder="Ej. 4"
            />
          </label>

          <p className="texto-division">
            La cantidad se dividirá a partes iguales entre los
            participantes.
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

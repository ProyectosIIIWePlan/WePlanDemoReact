// src/components/Victor/ModalEditarGestion.jsx
import { useState } from "react";
import "./ListaGestiones.css";

function ModalEditarGestion({ gestion, onClose, onGuardar }) {
  const esViaje = gestion.tipo === "viaje";

  const normalizarHoteles = () => {
    const lista = gestion.hoteles && gestion.hoteles.length
      ? gestion.hoteles
      : [{ id: 1, nombre: "", entrada: "", salida: "" }];

    return lista.map((h, idx) => ({
      id: h.id || idx + 1,
      nombre: h.nombre || "",
      entrada: h.entrada || "",
      salida: h.salida || "",
    }));
  };

  const normalizarTransportes = () => {
    const lista = gestion.transportes && gestion.transportes.length
      ? gestion.transportes
      : [{ id: 1, tipo: "", fecha: "" }];

    return lista.map((t, idx) => ({
      id: t.id || idx + 1,
      tipo: t.tipo || "",
      fecha: t.fecha || "",
    }));
  };

  const [form, setForm] = useState({
    nombre: gestion.nombre,
    costeTotal: gestion.costeTotal || "",
    cantidadTotal: gestion.cantidadTotal || "",
    participantesTotales:
      gestion.participantes?.length ||
      gestion.participantesTotales ||
      1,
    hoteles: normalizarHoteles(),
    transportes: normalizarTransportes(),
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
        { id: Date.now(), nombre: "", entrada: "", salida: "" },
      ],
    }));
  };

  const añadirTransporte = () => {
    setForm((prev) => ({
      ...prev,
      transportes: [
        ...prev.transportes,
        { id: Date.now(), tipo: "", fecha: "" },
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

    const participantesTotales = Number(
      form.participantesTotales || 0
    );
    const coste = esViaje
      ? Number(form.costeTotal || 0)
      : Number(form.cantidadTotal || 0);

    let participantes = gestion.participantes || [];

    // Si cambia el número, regeneramos participantes
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
      // Mantener participantes, recalcular debePagar
      participantes = participantes.map((p, index) => ({
        ...p,
        nombre: p.nombre || `Persona ${index + 1}`,
        debePagar:
          participantesTotales > 0 && coste > 0
            ? Number((coste / participantesTotales).toFixed(2))
            : 0,
      }));
    }

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

    const gestionActualizada = {
      ...gestion,
      nombre: form.nombre,
      participantesTotales,
      participantes,
      hoteles: esViaje ? hotelesLimpios : [],
      transportes: esViaje ? transportesLimpios : [],
      ...(esViaje
        ? { costeTotal: coste, cantidadTotal: undefined }
        : { cantidadTotal: coste, costeTotal: undefined }),
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
              onChange={handleBasicChange}
              required
            />
          </label>

          {esViaje ? (
            <>
              <p className="subseccion-titulo">Alojamientos</p>
              {form.hoteles.map((hotel, index) => (
                <div
                  className="grupo-campo-multiple"
                  key={hotel.id ?? index}
                >
                  <label>
                    Nombre del alojamiento:
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
                      Quitar estancia
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="boton-mini boton-mini-secundario"
                onClick={añadirHotel}
              >
                + Añadir estancia
              </button>

              <p className="subseccion-titulo">Billetes</p>
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
                      Quitar billete
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="boton-mini boton-mini-secundario"
                onClick={añadirTransporte}
              >
                + Añadir billete
              </button>

              <label>
                Coste total (€):
                <input
                  type="number"
                  name="costeTotal"
                  value={form.costeTotal}
                  onChange={handleBasicChange}
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
                onChange={handleBasicChange}
              />
            </label>
          )}

          <p className="texto-division">
            Al guardar se recalcula la cantidad por persona de forma
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

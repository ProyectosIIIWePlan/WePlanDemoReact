import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import NavbarGestiones from "./NavbarGestiones";
import GestionCard from "./GestionCard";
import ModalAñadirGestion from "./ModalAñadirGestion";
import ModalEditarGestion from "./ModalEditarGestion";
import ModalPagosGestion from "./ModalPagosGestion";
import Navbar from '../Mario/NavBar.jsx';
import "./ListaGestiones.css";

function ListaGestiones() {
    const { groupId } = useParams();

    const [groupName, setGroupName] = useState(null);
    const [gestiones, setGestiones] = useState([]);
    const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
    const [gestionEditar, setGestionEditar] = useState(null);
    const [gestionPagos, setGestionPagos] = useState(null);

    const skipSaveRef = useRef(false);

// cargar en localStorage
    useEffect(() => {
        skipSaveRef.current = true;
        const guardadas = JSON.parse(localStorage.getItem(`gestiones_${groupId}`)) || [];
        setGestiones(guardadas);
        const gruposInfo = JSON.parse(localStorage.getItem(`grupos`)) || [];
        setGroupName(gruposInfo.find((g) => g.id == groupId)?.nombre || "Gestiones");

    }, [groupId]);

    // guardar en localStorage
    useEffect(() => {
        if (skipSaveRef.current) {
            skipSaveRef.current = false;
            return;
        }
        localStorage.setItem(`gestiones_${groupId}`, JSON.stringify(gestiones));
    }, [gestiones, groupId]);

    const abrirModalCrear = () => setMostrarModalCrear(true);
    const cerrarModalCrear = () => setMostrarModalCrear(false);

    const abrirModalEditar = (gestion) => setGestionEditar(gestion);
    const cerrarModalEditar = () => setGestionEditar(null);

    const abrirModalPagos = (gestion) => setGestionPagos(gestion);
    const cerrarModalPagos = () => setGestionPagos(null);

    // Crear gestión nueva
    const handleCrearGestion = (nuevaGestion) => {
        nuevaGestion.groupId = groupId;
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

    const handleEliminarGestion = (id) => {
        const confirmar = window.confirm("¿Seguro que quieres eliminar esta gestión?");
        if (!confirmar) return;

        setGestiones((prev) => prev.filter((g) => g.id !== id));
    };

    return (
        <div className="lista-gestiones-page">
            <Navbar gestName={groupName} admin={null} groupId={null} ></Navbar>

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
                        onEliminar={handleEliminarGestion}
                        groupId={groupId}
                    />
                ))}
            </main>

            <button className="boton-flotante-aniadir" onClick={abrirModalCrear}>
                +
            </button>

            {mostrarModalCrear && (
                <ModalAñadirGestion onClose={cerrarModalCrear} onCrearGestion={handleCrearGestion} groupId={groupId} />
            )}

            {gestionEditar && (
                <ModalEditarGestion gestion={gestionEditar} onClose={cerrarModalEditar} onGuardar={handleActualizarGestion} />
            )}

            {gestionPagos && (
                <ModalPagosGestion gestion={gestionPagos} onClose={cerrarModalPagos} onActualizarPagos={handleActualizarPagos} />
            )}
        </div>
    );
}

export default ListaGestiones;
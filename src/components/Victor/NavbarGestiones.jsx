// src/components/Victor/NavbarGestiones.jsx

function NavbarGestiones() {
  const handleInvitar = () => {
    alert("Aquí se mostraría la pantalla para invitar miembros al grupo.");
  };

  return (
    <header className="navbar-gestiones">
      <div className="navbar-gestiones-left">
        <button
          className="navbar-back"
          type="button"
          onClick={() => {
            console.log("Volver atrás");
          }}
        >
          ←
        </button>
        <h1 className="navbar-titulo">
          Titulo de viaje
          {/* TODO: cambiar este título cuando se integre con la pantalla de grupos */}
        </h1>
      </div>

      <button
        className="navbar-boton-invitar"
        type="button"
        onClick={handleInvitar}
      >
        Invitar miembros
      </button>
    </header>
  );
}

export default NavbarGestiones;

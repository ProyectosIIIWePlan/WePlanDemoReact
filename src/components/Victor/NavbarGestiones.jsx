// src/components/Victor/NavbarGestiones.jsx

import {useNavigate} from "react-router-dom";

function NavbarGestiones({ groupName }) {
  const handleInvitar = () => {
    alert("Aquí se mostraría la pantalla para invitar miembros al grupo.");
  };
  const navigate = useNavigate();

  return (
    <header className="navbar-gestiones">
      <div className="navbar-gestiones-left">
        <button
          className="navbar-back"
          type="button"
          onClick={() => {
            navigate('/')
          }}
        >
          ←
        </button>
        <h1 className="navbar-titulo">
          {groupName}
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

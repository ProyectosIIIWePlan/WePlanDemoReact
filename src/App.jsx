
import { Routes, Route } from 'react-router-dom';
import './App.css'

import CrearGrupo from './components/Jaime/GrupoManager.jsx';
import GestionGrupo from './components/Jaime/GestionMiembros.jsx';
import LoadGestion from './components/Mario/LoadGestion.jsx'
import ListaGestiones from "./components/Victor/ListaGestiones.jsx";

function App() {
  return (
    <>
        <Routes>

            <Route path="/" element={<CrearGrupo />} />
            <Route path="/grupo/:grupoId" element={<GestionGrupo />} />
            <Route path="/gestion/:groupId/:gestId" element={<LoadGestion payTotal={1000} nPersonas={8} admin={false} isTrip={true} />} />
            <Route path="/gestiones/:groupId" element={<ListaGestiones />} />
            
        </Routes>
    </>
  )
}

export default App;
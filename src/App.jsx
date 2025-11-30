
import { Routes, Route } from 'react-router-dom';
import './App.css'

import CrearGrupo from './Components/GrupoManager';
import GestionGrupo from './Components/GestionMiembros';
import Gestion from './components/Mario/Gestion.jsx'

function App() {

  // Victor <ListaGestiones />
  return (
    <>
        <Routes>

            <Route path="/" element={<CrearGrupo />} />
            <Route path="/grupo/:grupoId" element={<GestionGrupo />} />
            <Route path="/gestion" element={<Gestion payTotal={1000} nPersonas={8} admin={false} isTrip={true} />} />
            
        </Routes>
    </>
  )
}

export default App;
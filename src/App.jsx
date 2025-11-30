import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'

import Gestion from './components/Mario/Gestion.jsx'
import Viaje from './components/Mario/Viaje.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
            <Route path="/" element={<Gestion payTotal={1000} nPersonas={8} admin={false} isTrip={true} />} />
        </Routes>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'

import Page from './components/Nombre_Pagina_Aqui.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Page />
    </>
  )
}

export default App

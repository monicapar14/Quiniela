import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Principal from "./views/Principal"
import Participantes from './views/Participantes'
import Partidos from './views/Partidos'
import PartidosxDia from './views/PartidosxDia'
import Exito from './views/ExitoEnvio'
import Ranking from './views/Ranking'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/participantes" element={<Participantes />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/partidosxDia" element={<PartidosxDia />} />
        <Route path='/enviadosC' element={<Exito />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
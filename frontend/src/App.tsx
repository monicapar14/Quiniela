import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Principal from "./views/Principal"
import Participantes from './views/Participantes'
import Partidos from './views/Partidos'
import PartidosxDia from './views/PartidosxDia'
import Ranking from './views/Ranking'
import Login from './views/Login'
import PrediccionesParticipante from './views/PrediccionesParticipante'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/participantes" element={<Participantes />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/partidosxDia" element={<PartidosxDia />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/participante/:id/predicciones" element={<PrediccionesParticipante />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
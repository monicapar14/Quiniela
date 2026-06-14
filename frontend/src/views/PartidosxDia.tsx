import { useEffect, useState } from "react"
import type { FormEvent} from "react"
import api from "../api"
import type { PartidosObtenidos } from "../Interfaces/partidosDisponibles"
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/partidosDia.css'

type ProductoConSeleccion = PartidosObtenidos & { seleccionado?: boolean }

const Partidos = () => {

    const navigate = useNavigate();    

    const [partidos, setPartidos] = useState<ProductoConSeleccion[]>([]);

    useEffect(() => {

        const obtenerPartidos = async () => {
            try {
                const response = await api.get('partidos/partidosxdia')
                setPartidos(response.data)
            } catch (error) {
                console.error('Error al obtener los partidos:', error)
            }
        }

        obtenerPartidos()
    }, [])

    return (
        <Layout>
            <div className="today-page">
                <div className="today-header">
                    <span className="today-icon">📅</span>
                    <h1>Partidos del Día</h1>
                </div>

    <div className="today-grid">

        {partidos.map((partido, index) => (

            <div className="today-card" key={index}>

                <div className={`group-badge grupo-${partido.grup_nom.toLowerCase()}`}>
                    Grupo {partido.grup_nom}
                </div>

                <div className="today-time">
                    🕒 {new Date(partido.fecha).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>

                <div className="teams-container">

                    <div className="team-name">
                        {partido.equipo_local}
                    </div>

                    <div className="today-score">

                        {partido.goles_local != null
                            ? partido.goles_local
                            : "-"}

                        <span className="vs">VS</span>

                        {partido.goles_visitante != null
                            ? partido.goles_visitante
                            : "-"}

                    </div>

                    <div className="team-name">
                        {partido.equipo_visitante}
                    </div>

                </div>

            </div>

        ))}

    </div>

    <div className="text-center mt-4">
        <button
            className="worldcup-btn"
            onClick={() => navigate('/')}
        >
            ← Regresar
        </button>
    </div>

</div>
        </Layout>        
    )
}

export default Partidos 
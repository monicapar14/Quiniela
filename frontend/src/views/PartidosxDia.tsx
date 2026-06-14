import { useEffect, useState } from "react"
import api from "../api"
import type { PartidosObtenidos } from "../Interfaces/partidosDisponibles"
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/partidosDia.css'

const Partidos = () => {

    const navigate = useNavigate();    

    const [partidos, setPartidos] = useState<PartidosObtenidos[]>([]);

    const [mostrarPredicciones, setMostrarPredicciones] = useState(false);

    const [predicciones, setPredicciones] = useState<any[]>([]);

    const [partidoPredicciones, setPartidoPredicciones] = useState<PartidosObtenidos | null>(null);

    useEffect(() => {

        const obtenerPartidos = async () => {
            try {
                const response = await api.get('/partidos/partidosxdia')
                setPartidos(response.data)
            } catch (error) {
                console.error('Error al obtener los partidos:', error)
            }
        }

        obtenerPartidos()
    }, [])
    
    const verPredicciones = async (
        partido: PartidosObtenidos
    ) => {

        try {

            const response =
                await api.get(
                    `/partidos/${partido.id}/predicciones`
                );

            setPredicciones(
                response.data
            );

            setPartidoPredicciones(
                partido
            );

            setMostrarPredicciones(
                true
            );

        }
        catch (error) {

            console.error(error);

            alert(
                "Error al obtener predicciones"
            );

        }
    };

    const obtenerClaseGrupo = (grupo) => {
        const letra = grupo.replace('Grupo ', '').trim().toLowerCase();
        return `grupo-${letra}`;
    };

    return (
        <Layout>
            <div className="matches-page">
                <div className="matches-title">
                    <span style={{ fontSize: '2.5rem' }}>⚽</span>
                    <h1>Todos los Partidos</h1>
                </div>

                <div className="matches-grid">
                    {partidos.map((partido, index) => (
                        <div className="match-card" key={index}>
                           <div className={`group-badge ${obtenerClaseGrupo(partido.grup_nom)}`}>
                                Grupo {partido.grup_nom}
                            </div>
                            <div className="teams">                        
                                <div className="team-name">
                                    {partido.equipo_local}
                                </div>
                                <div className="score">
                                    {partido.goles_local ?? "-"}
                                    <span className="vs mx-3">vs</span>
                                    {partido.goles_visitante ?? "-"}
                                </div>
                                <div className="team-name">
                                    {partido.equipo_visitante}
                                </div>
                            </div>
                            <div className="match-footer">
                                <span>
                                    <i className="fa-solid fa-calendar-days me-1"></i>
                                    {new Date(partido.fecha).toLocaleDateString('es-ES')}
                                </span>
                                <span>
                                    <i className="fa-solid fa-clock me-1"></i>
                                    {new Date(partido.fecha).toLocaleTimeString('es-ES', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            
                            <div style={{ marginTop: '10px', textAlign: 'center'}}>
                                <button
                                    className="worldcup-btn"
                                    onClick={() =>
                                        verPredicciones(partido)
                                    }
                                >
                                    <i className="fa-solid fa-eye me-2"></i>
                                    Ver Predicciones
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="back-btn">
                    <button
                        className="worldcup-btn"
                        onClick={() => navigate('/')}
                    >
                        <i className="fa-solid fa-arrow-left me-2"></i>
                        Regresar
                    </button>
                </div>

                {
                    mostrarPredicciones &&
                    partidoPredicciones && (

                        <div className="modal-overlay">
                            <div className="modal-partido-predicciones">
                                <div className="modal-header-predicciones">
                                    <h2>
                                        ⚽ Predicciones
                                    </h2>

                                    <p>
                                        {partidoPredicciones.equipo_local}
                                        {" vs "}
                                        {partidoPredicciones.equipo_visitante}
                                    </p>
                                </div>

                                {
                                    predicciones.length === 0 &&
                                    (
                                        <p>
                                            No existen predicciones
                                            para este partido.
                                        </p>
                                    )
                                }

                                <div className="lista-predicciones">
                                    {
                                        predicciones.map(
                                            (
                                                p,
                                                index
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="prediccion-item"
                                                >
                                                    <span
                                                        className="nombre-participante"
                                                    >
                                                        🏆 {p.nombre}
                                                    </span>

                                                    <span
                                                        className="marcador-prediccion"
                                                    >
                                                        {p.pred_goles_local}
                                                        {" - "}
                                                        {p.pred_goles_visitante}
                                                    </span>

                                                </div>
                                            )
                                        )
                                    }
                                </div>

                                <div
                                    className="modal-footer-predicciones"
                                >
                                    <button
                                        className="worldcup-btn"
                                        onClick={() =>
                                            setMostrarPredicciones(
                                                false
                                            )
                                        }
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
        </Layout>        
    )
}

export default Partidos 
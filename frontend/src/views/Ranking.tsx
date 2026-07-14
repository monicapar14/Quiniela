import { useEffect, useState } from "react";
import api from "../api";
import type { Ranking } from "../Interfaces/participantesDisponibles"
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/rankign.css'

const Participantes = () => { 

    const navigate = useNavigate(); 
    
    const [ranking, setRanking] = useState<Ranking[]>([]);

    useEffect(() => {

        const obtenerRanking = async () => {
            try {
                const response = await api.get('/participantes/getRanking')
                setRanking(response.data)
            } catch (error) {
                console.error('Error al obtener los participantes:', error)
            }
        }        

        obtenerRanking()
    }, [])    

    const top3 = ranking.slice(0, 3);
    
    return (
        <Layout>
            <div className="ranking-page d-flex flex-column">
                <div className="ranking-title-clean">
                    🏆 Ranking General
                </div>

                {top3.length > 0 && (
                    <div className="podium">
                        {/* 2.º lugar (izquierda) */}
                        {top3[1] && (
                        <div className="podium-item podium-second">
                            <div className="podium-circle silver">
                                <div className="podium-medal">🥈</div>

                                <div className="podium-name">
                                    {top3[1].nombre}
                                </div>

                                <div className="podium-points">
                                    {top3[1].puntos_totales} pts
                                </div>
                            </div>

                            <div className="podium-bar bar-first">
                                2
                            </div>
                        </div>
                        )}

                        {/* 1.er lugar (centro, más alto) */}
                        {top3[0] && (
                        <div className="podium-item podium-first">
                            <div className="podium-circle gold">
                                <div className="podium-medal">🥇</div>

                                <div className="podium-name">
                                    {top3[0].nombre}
                                </div>

                                <div className="podium-points">
                                    {top3[0].puntos_totales} pts
                                </div>
                            </div>

                            <div className="podium-bar bar-first">
                                1
                            </div>
                        </div>
                        )}

                        {/* 3.er lugar (derecha) */}
                        {top3[2] && (
                        <div className="podium-item podium-third">
                            <div className="podium-circle bronze">
                                <div className="podium-medal">🥉</div>

                                <div className="podium-name">
                                    {top3[2].nombre}
                                </div>

                                <div className="podium-points">
                                    {top3[2].puntos_totales} pts
                                </div>
                            </div>

                            <div className="podium-bar bar-first">
                                3
                            </div>
                        </div>
                        )}
                    </div>
                    )}

                <div className="ranking-wrapper">
                    <div className="ranking-card">
                        <table className="ranking-table">
                            <thead>
                                <tr>
                                    <th>🏅Posición</th>
                                    <th>👤Participante</th>
                                    <th>⭐Puntos</th>
                                    <th>🎯Exactos</th>
                                </tr>
                            </thead>

                            <tbody>
                                {ranking.slice(3).map((ran, index) => (
                                    <tr
                                        key={ran.id}
                                    >
                                        <td className="position">
                                            <span className="position-number">{index + 4}</span>
                                        </td>
                                        <td className="pred-nombre">{ran.nombre}</td>                                            
                                        <td>
                                            <span className="points">{ran.puntos_totales}</span>
                                        </td>                                            
                                        <td>
                                            <span className="exactos">{ran.exactos_totales}</span>
                                        </td>                                            
                                    </tr>
                                ))}
                            </tbody>                                    
                        </table>
                    </div>
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

export default Participantes 
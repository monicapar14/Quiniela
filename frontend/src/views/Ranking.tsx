import { useEffect, useState } from "react"
import api from "../api"
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

    return (
        <Layout>
            <div className="ranking-page d-flex flex-column">
                <div className="ranking-title-clean">
                    🏆 Ranking General
                </div>

                <div className="ranking-wrapper">
                    <div className="ranking-card">
                        <table className="ranking-table">
                            <thead>
                                <tr>
                                    <th>Posición</th>
                                    <th>Participante</th>
                                    <th>Puntos</th>
                                    <th>Exactos</th>
                                </tr>
                            </thead>

                            <tbody>
                                {ranking.map((ran, index) => (
                                    <tr
                                        key={ran.id}
                                        className={
                                            index === 0
                                            ? "top1"
                                            : index === 1
                                            ? "top2"
                                            : index === 2
                                            ? "top3"
                                            : ""
                                        }
                                    >
                                        <td className="position">
                                            {index === 0 && "🥇"}
                                            {index === 1 && "🥈"}
                                            {index === 2 && "🥉"}
                                            {index > 2 && index + 1}
                                        </td>
                                        <td className="name">{ran.nombre}</td>                                            
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
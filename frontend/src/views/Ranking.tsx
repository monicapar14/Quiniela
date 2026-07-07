import useApi from "../hooks/useApi"
import type { Ranking } from "../Interfaces/participantesDisponibles"
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/rankign.css'

const Participantes = () => { 

    const navigate = useNavigate(); 
    
    const { data: ranking, loading, error } = useApi<Ranking[]>('/participantes/getRanking')

    return (
        <Layout>
            <div className="ranking-page d-flex flex-column">
                <div className="ranking-title-clean">
                    🏆 Ranking General
                </div>

                <div className="ranking-wrapper">
                    <div className="ranking-card">
                        {loading && (
                            <div className="text-center py-5">
                                <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p className="text-light mt-2">Cargando ranking...</p>
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger text-center mx-3" role="alert">
                                {error}
                            </div>
                        )}

                        {!loading && !error && (
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
                                    {ranking?.map((ran, index) => (
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
                                                {index === 0 && <span className="medal">🥇</span>}
                                                {index === 1 && <span className="medal">🥈</span>}
                                                {index === 2 && <span className="medal">🥉</span>}
                                                {index > 2 && <span className="position-number">{index + 1}</span>}
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
                        )}
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
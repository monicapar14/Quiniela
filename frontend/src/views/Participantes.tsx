import useApi from "../hooks/useApi"
import type { ParticipantesObtenidos } from "../Interfaces/participantesDisponibles"
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/participantes.css'

type ServicioConSeleccion = ParticipantesObtenidos & { seleccionado?: boolean }

const Participantes = () => { 

    const navigate = useNavigate();   
    
    const { data: participantes, loading, error } = useApi<ServicioConSeleccion[]>('/participantes')

    return (
        <Layout>
            <div className="participants-page">
                <div className="participants-card">
                    <div className="participants-header">
                        <span className="trophy">🏆</span>
                        <h2>Participantes</h2>
                        <p>Tabla general de puntos</p>
                    </div>

                    {loading && (
                        <div className="text-center py-5">
                            <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="text-light mt-2">Cargando participantes...</p>
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger text-center mx-3" role="alert">
                            {error}
                        </div>
                    )}

                    {!loading && !error && (
                        <table className="participants-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Participante</th>
                                    <th>Puntos</th>
                                    <th></th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {participantes?.map((p, index) => (
                                    <tr key={p.id_p}>
                                        <td>{index + 1}</td>
                                        <td>{p.nombre}</td>
                                        <td>
                                            <span className="points">
                                                {p.puntos_totales}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="worldcup-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/participante/${p.id_p}/predicciones`
                                                    )
                                                }
                                            >
                                                <i className="fa-solid fa-eye me-2"></i>
                                                Ver Predicciones
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>                            
                        </table>
                    )}

                    <div className="participants-footer">
                        <button onClick={() => navigate('/')}>
                            ← Regresar
                        </button>
                    </div>
                </div>
            </div>
        </Layout>        
    )
}

export default Participantes 
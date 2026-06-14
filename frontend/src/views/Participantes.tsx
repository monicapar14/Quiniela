import { useEffect, useState } from "react"
import type { FormEvent} from "react"
import api from "../api"
import type { ParticipantesObtenidos } from "../Interfaces/participantesDisponibles"
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/participantes.css'

type ServicioConSeleccion = ParticipantesObtenidos & { seleccionado?: boolean }

const Participantes = () => { 

    const navigate = useNavigate();   
    
    const [participantes, setParticipantes] = useState<ServicioConSeleccion[]>([]);    

    useEffect(() => {

        const obtenerParticipantes = async () => {
            try {
                const response = await api.get('/participantes')
                setParticipantes(response.data)
            } catch (error) {
                console.error('Error al obtener los participantes:', error)
            }
        }

        obtenerParticipantes()
    }, [])    

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }
        
    return (
        <Layout>
            <div className="participants-page">
                <div className="participants-card">
                    <div className="participants-header">
                        <span className="trophy">🏆</span>
                        <h2>Participantes</h2>
                        <p>Tabla general de puntos</p>
                    </div>

                    <table className="participants-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Participante</th>
                                <th>Puntos</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {participantes.map((p, index) => (
                                <tr key={p.id_p}>
                                    <td>{index + 1}</td>
                                    <td>{p.nombre}</td>
                                    <td>
                                        <span className="points">{p.puntos_totales}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>                            
                    </table>

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
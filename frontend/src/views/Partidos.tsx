import { useEffect, useState, useRef } from "react"
import type { FormEvent} from "react"
import api from "../api"
import type { PartidosObtenidos } from "../Interfaces/partidosDisponibles"
import type { DescuentosDisponibles } from "../Interfaces/partidosDisponibles"
import { useNavigate } from 'react-router-dom'
import type { ObtenidosSeleccionados } from '../Interfaces/partidosDisponibles'
import Layout from '../components/Layout'
import '../styles/partidos.css'

type ProductoConSeleccion = PartidosObtenidos & { seleccionado?: boolean }

const Partidos = () => {

    const navigate = useNavigate();    

    const [descuentos, setDescuentos] = useState<DescuentosDisponibles[]>([]);
    const [partidos, setPartidos] = useState<ProductoConSeleccion[]>([]);

    const [descuento_total, setDescuento_total] = useState(0)

    const descuento_ref = useRef(0);

    const [obtenidos, setObtenidos] = useState<ObtenidosSeleccionados[]>([])

    useEffect(() => {

        const obtenerPartidos = async () => {
            try {
                const response = await api.get('/partidos')
                setPartidos(response.data)
            } catch (error) {
                console.error('Error al obtener los partidos:', error)
            }
        }

        const obtenerDescuentoS = async () => {
            try {
                const response = await api.get('/productos/descuentos')
                setDescuentos(response.data)
            } catch (error) {
                console.error('Error al obtener los productos:', error)
            }
        }

        obtenerPartidos()
        obtenerDescuentoS()
    }, [])

    useEffect(() => {
        if(partidos.length > 0 && obtenidos.length > 0) {
            const productosActualizados = partidos.map(producto => ({
                ...producto,
                seleccionado: obtenidos.some(o => o.id_producto === producto.id_producto)
            }))
            setPartidos(productosActualizados)
            const seleccionadosIniciales = productosActualizados.filter(s => s.seleccionado)
            setSeleccionados(seleccionadosIniciales)

            descuento_ref.current = 0
            descuentos.forEach((descuento) => {
                if(seleccionadosIniciales.length >= Number(descuento.campoC)){
                    if(descuento_ref.current < Number(descuento.descuento)){
                        descuento_ref.current = Number(descuento.descuento)
                    }
                }
            })
            setDescuento_total(descuento_ref.current)
        }
    }, [partidos.length, obtenidos.length])    

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await enviarDatos();

        await new Promise(r => setTimeout(r, 300))

        navigate('/confirmacion', { state: { foo: id_Sesion } });
    }

    const enviarDatos = async () => {
        console.log("descuento " + descuento_ref.current);

        const idsSeleccionados = seleccionados.map(s => s.id_producto).sort()
        const idsObtenidos = obtenidos.map(o => o.id_producto).sort()
        const cambiaron = JSON.stringify(idsSeleccionados) !== JSON.stringify(idsObtenidos)

        console.log("cambiaron: " + cambiaron)

        // Siempre actualiza el descuento
        try {
            const respuesta = await api.post('/confirmaciones/updateP', {
                id_confirmacion: id_Sesion,
                descuento_producto: descuento_ref.current
            })
            console.log(respuesta.data)
        } catch(error) {
            console.error('Error al actualizar descuento:', error)
        }
    }

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
            </div>
        </Layout>        
    )
}

export default Partidos 
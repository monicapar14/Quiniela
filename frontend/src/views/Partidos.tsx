import { useEffect, useState } from "react"
import api from "../api"
import type { PartidosObtenidos } from "../Interfaces/partidosDisponibles"
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import '../styles/partidos.css'
import { banderas } from '../utils/banderas'

const Partidos = () => {

    const navigate = useNavigate();    

    const usuario = JSON.parse(
        localStorage.getItem("usuario") || "null"
    );

    const esAdmin = usuario?.rol === "admin";

    const [partidos, setPartidos] = useState<PartidosObtenidos[]>([]);

    const [mostrarModal, setMostrarModal] = useState(false);

    const [partidoEditar, setPartidoEditar] = useState<PartidosObtenidos | null>(null);

    const [golesLocal, setGolesLocal] = useState<number | string>("");

    const [golesVisitante, setGolesVisitante] = useState<number | string>("");

    const [mostrarPredicciones, setMostrarPredicciones] = useState(false);

    const [predicciones, setPredicciones] = useState<any[]>([]);

    const [partidoPredicciones, setPartidoPredicciones] = useState<PartidosObtenidos | null>(null);

    const [mostrarEditarPred, setMostrarEditarPred] = useState(false);

    const [prediccionEditar, setPrediccionEditar] = useState<any>(null);

    const [nuevoLocal, setNuevoLocal] = useState<number | string>("");

    const [nuevoVisitante, setNuevoVisitante] = useState<number | string>("");

    useEffect(() => {

        const obtenerPartidos = async () => {
            try {
                const response = await api.get('/partidos')
                setPartidos(response.data)
            } catch (error) {
                console.error('Error al obtener los partidos:', error)
            }
        }

        obtenerPartidos()
    }, [])

    const abrirModal = (
        partido: PartidosObtenidos
    ) => {

        setPartidoEditar(partido);

        setGolesLocal(partido.goles_local ?? "");

        setGolesVisitante(partido.goles_visitante ?? "");

        setMostrarModal(true);
    };

    const guardarResultado = async () => {

        if (!partidoEditar) return;

        try {

            await api.put(`/partidos/${partidoEditar.id}`,
                {
                    goles_local: golesLocal,
                    goles_visitante: golesVisitante
                }
            );

            setPartidos(
                partidos.map((p) =>
                    p.id === partidoEditar.id
                        ? {
                            ...p,
                            goles_local: Number(golesLocal),
                            goles_visitante: Number(golesVisitante)
                        }
                        : p
                )
            );

            setMostrarModal(false);

            alert(
                "Resultado actualizado correctamente"
            );

        } catch (error) {
            console.error(error);
            alert(
                "Error al actualizar el partido"
            );
        }
    };

    const verPredicciones = async (
        partido: PartidosObtenidos
    ) => {

        try {

            const response = await api.get(`/partidos/${partido.id}/predicciones`);

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

    const abrirEditarPrediccion = (
        prediccion: any
    ) => {

        setPrediccionEditar(
            prediccion
        );

        setNuevoLocal(
            prediccion.pred_goles_local
        );

        setNuevoVisitante(
            prediccion.pred_goles_visitante
        );

        setMostrarEditarPred(
            true
        );
    };

    const guardarPrediccion = async (
    ) => {
        
        if (!prediccionEditar)
            return;

        try {

            await api.put(
                `/predicciones/${prediccionEditar.id}`,
                {
                    pred_goles_local:
                        nuevoLocal,

                    pred_goles_visitante:
                        nuevoVisitante,

                    partido_id:
                        prediccionEditar.partido_id
                }
            );

            setPredicciones(
                predicciones.map(
                    (p) =>
                        p.id ===
                        prediccionEditar.id
                            ? {
                                ...p,
                                pred_goles_local:
                                    Number(
                                        nuevoLocal
                                    ),
                                pred_goles_visitante:
                                    Number(
                                        nuevoVisitante
                                    )
                            }
                            : p
                )
            );

            setMostrarEditarPred(
                false
            );

            alert(
                "Predicción actualizada"
            );

        }
        catch (error) {

            console.error(error);

            alert(
                "Error al actualizar"
            );

        }
    };

    const obtenerClaseGrupo = (grupo: any) => {
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
                                    <img
                                        src={
                                            banderas[
                                                partido.equipo_local
                                            ]
                                        }
                                        alt=""
                                        style={{
                                            width: '35px',
                                            height: '35px',
                                            marginRight: '-5px'
                                        }}
                                    />

                                    {partido.equipo_local}

                                </div>
                                <div className="score">
                                    {partido.goles_local ?? "-"}
                                    <span className="vs mx-3">vs</span>
                                    {partido.goles_visitante ?? "-"}
                                </div>
                                <div className="team-name">
                                    <img
                                        src={
                                            banderas[
                                                partido.equipo_visitante
                                            ]
                                        }
                                        alt=""
                                        style={{
                                            width: '35px',
                                            height: '35px',
                                            marginRight: '-5px'
                                        }}
                                    />

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
                            {
                                esAdmin && (
                                    <div
                                        style={{
                                            marginTop: '15px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <button
                                            className="worldcup-btn"
                                            onClick={() =>
                                                abrirModal(partido)
                                            }
                                        >
                                            <i className="fa-solid fa-pen me-2"></i>
                                            Editar Resultado
                                        </button>
                                    </div>
                                )
                            }
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
                    mostrarModal &&
                    partidoEditar && (
                        <div className="modal-overlay">

                            <div className="modal-partido">

                                <h2>
                                    Editar Resultado
                                </h2>

                                <p>
                                    {partidoEditar.equipo_local}
                                    {" vs "}
                                    {partidoEditar.equipo_visitante}
                                </p>

                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '20px',
                                        justifyContent:
                                            'center'
                                    }}
                                >

                                    <input
                                        type="number"
                                        value={golesLocal}
                                        onChange={(e) =>
                                            setGolesLocal(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Local"
                                    />

                                    <input
                                        type="number"
                                        value={
                                            golesVisitante
                                        }
                                        onChange={(e) =>
                                            setGolesVisitante(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Visitante"
                                    />

                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '20px',
                                        marginTop: '20px',
                                        justifyContent:
                                            'center'
                                    }}
                                >
                                    <button
                                        className="worldcup-btn"
                                        onClick={
                                            guardarResultado
                                        }
                                    >
                                        Guardar
                                    </button>

                                    <button
                                        className="worldcup-btn"
                                        onClick={() =>
                                            setMostrarModal(
                                                false
                                            )
                                        }
                                    >
                                        Cancelar
                                    </button>
                                </div>

                            </div>

                        </div>
                    )
                }

                {
                    mostrarPredicciones &&
                    partidoPredicciones && (

                        <div className="modal-overlay">
                            <div className="modal-partido-predicciones">
                                <div className="modal-header-predicciones">
                                    <h2>⚽ Predicciones</h2>
                                    <div className="modal-equipos">
                                        <div className="modal-equipo">
                                            <img src={banderas[partidoPredicciones.equipo_local]} alt="" />
                                            {partidoPredicciones.equipo_local}
                                        </div>
                                        <span className="modal-vs">
                                            {partidoPredicciones.goles_local ?? "-"} - {partidoPredicciones.goles_visitante ?? "-"}
                                        </span>
                                        <div className="modal-equipo">
                                            {partidoPredicciones.equipo_visitante}
                                            <img src={banderas[partidoPredicciones.equipo_visitante]} alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div className="predicciones-tabla-header">
                                    <span>Participante</span>
                                    <span style={{textAlign: 'right'}}>Predicción</span>
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

                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            gap: '10px',
                                                            alignItems: 'center'
                                                        }}
                                                    >

                                                        <span
                                                            className="marcador-prediccion"
                                                        >
                                                            {p.pred_goles_local}
                                                            {" - "}
                                                            {p.pred_goles_visitante}
                                                        </span>

                                                        {
                                                            esAdmin && (
                                                                <button
                                                                    className="worldcup-btn"
                                                                    onClick={() =>
                                                                        abrirEditarPrediccion(
                                                                            p
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fa-solid fa-pen"></i>
                                                                </button>
                                                            )
                                                        }

                                                    </div>
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

                {
                    mostrarEditarPred &&
                    prediccionEditar && (

                        <div
                            className="modal-overlay"
                        >

                            <div
                                className="modal-partido"
                            >

                                <h2>
                                    Editar Predicción
                                </h2>

                                <h3>
                                    {prediccionEditar.nombre}
                                </h3>

                                <div
                                    style={{
                                        display:
                                            'flex',
                                        gap: '20px',
                                        justifyContent:
                                            'center'
                                    }}
                                >

                                    <input
                                        type="number"
                                        value={
                                            nuevoLocal
                                        }
                                        onChange={(e) =>
                                            setNuevoLocal(
                                                e.target
                                                    .value
                                            )
                                        }
                                    />

                                    <input
                                        type="number"
                                        value={
                                            nuevoVisitante
                                        }
                                        onChange={(e) =>
                                            setNuevoVisitante(
                                                e.target
                                                    .value
                                            )
                                        }
                                    />

                                </div>

                                <div
                                    style={{
                                        marginTop:
                                            '20px',
                                        display:
                                            'flex',
                                        gap: '20px',
                                        justifyContent:
                                            'center'
                                    }}
                                >

                                    <button
                                        className="worldcup-btn"
                                        onClick={
                                            guardarPrediccion
                                        }
                                    >
                                        Guardar
                                    </button>

                                    <button
                                        className="worldcup-btn"
                                        onClick={() =>
                                            setMostrarEditarPred(
                                                false
                                            )
                                        }
                                    >
                                        Cancelar
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
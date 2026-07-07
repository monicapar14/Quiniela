import { useMemo } from "react";
import useApi from "../hooks/useApi";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const PrediccionesParticipante = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { data: predicciones, loading, error } = useApi<any[]>(`/predicciones/participante/${id}`);

    const { partidosJugados, partidosPendientes, nombre } = useMemo(() => {
        if (!predicciones) {
            return { partidosJugados: [], partidosPendientes: [], nombre: "" };
        }

        const jugados = predicciones.filter(
            (p: any) => p.goles_local !== null && p.goles_visitante !== null
        );

        const pendientes = predicciones.filter(
            (p: any) => p.goles_local === null || p.goles_visitante === null
        );

        const nom = predicciones.length > 0 ? predicciones[0].nombre : "";

        return { partidosJugados: jugados, partidosPendientes: pendientes, nombre: nom };
    }, [predicciones]);

    return (
        <Layout>

            <div
                className="matches-page"
            >

                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="text-light mt-2">Cargando predicciones...</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger text-center mx-3" role="alert">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div
                            className="matches-title"
                        >
                            <span
                                style={{
                                    fontSize:
                                        "2.5rem"
                                }}
                            >
                                ⚽
                            </span>

                            <h1>
                                Predicciones
                            </h1>
                        </div>

                        <h3
                            style={{
                                textAlign:
                                    "center",
                                marginBottom:
                                    "30px", 
                                fontFamily: "FontAwesome",
                                color: '#e65a3e'
                            }}
                        >
                            {nombre}
                        </h3>
                        
                        <h2
                            style={{
                                textAlign: "center",
                                marginBottom: "20px",
                                marginTop: "50px",
                                color: "cyan"
                            }}
                        >
                            ✅ Partidos jugados
                        </h2>

                        <div className="matches-grid">

                            {
                                partidosJugados.map(
                                    (
                                        p,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="match-card"
                                        >

                                            <div
                                                className="teams"
                                            >

                                                <div
                                                    className="team-name"
                                                >
                                                    {p.equipo_local}
                                                </div>

                                                <div
                                                    className="score"
                                                >
                                                    {
                                                        p.pred_goles_local
                                                    }

                                                    <span
                                                        className="vs mx-3"
                                                    >
                                                        vs
                                                    </span>

                                                    {
                                                        p.pred_goles_visitante
                                                    }
                                                </div>

                                                <div
                                                    className="team-name"
                                                >
                                                    {p.equipo_visitante}
                                                </div>

                                            </div>

                                            <div
                                                style={{
                                                    textAlign:
                                                        "center",
                                                    marginTop:
                                                        "20px"
                                                }}
                                            >

                                                {
                                                    p.puntos === 3 &&
                                                    "✅ 3 puntos"
                                                }

                                                {
                                                    p.puntos === 2 &&
                                                    "🟢 2 puntos"
                                                }

                                                {
                                                    p.puntos === 1 &&
                                                    "🟡 1 punto"
                                                }

                                                {
                                                    p.puntos === 0 &&
                                                    "❌ 0 puntos"
                                                }

                                            </div>

                                        </div>

                                    )
                                )
                            }

                        </div>

                        <h2
                            style={{
                                textAlign: "center",
                                marginBottom: "20px",
                                marginTop: "30px",
                                color: "cyan"
                            }}
                        >
                            ⏳ Partidos por jugar
                        </h2>

                        <div className="matches-grid">

                            {
                                partidosPendientes.map(
                                    (
                                        p,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="match-card"
                                        >

                                            <div
                                                className="teams"
                                            >

                                                <div
                                                    className="team-name"
                                                >
                                                    {p.equipo_local}
                                                </div>

                                                <div
                                                    className="score"
                                                >
                                                    {
                                                        p.pred_goles_local
                                                    }

                                                    <span
                                                        className="vs mx-3"
                                                    >
                                                        vs
                                                    </span>

                                                    {
                                                        p.pred_goles_visitante
                                                    }
                                                </div>

                                                <div
                                                    className="team-name"
                                                >
                                                    {p.equipo_visitante}
                                                </div>

                                            </div>

                                        </div>

                                    )
                                )
                            }

                        </div>

                        <div
                            className="back-btn"
                        >
                            <button
                                className="worldcup-btn"
                                onClick={() =>
                                    navigate(-1)
                                }
                            >
                                Regresar
                            </button>
                        </div>
                    </>
                )}

            </div>

        </Layout>
    );
};

export default
PrediccionesParticipante;
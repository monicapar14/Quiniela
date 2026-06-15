import { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const PrediccionesParticipante = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [predicciones, setPredicciones] = useState<any[]>([]);

    const [partidosJugados, setPartidosJugados] = useState<any[]>([]);

    const [partidosPendientes, setPartidosPendientes] = useState<any[]>([]);

    const [nombre, setNombre] = useState("");

    useEffect(() => {

        obtenerPredicciones();

    }, []);

    const obtenerPredicciones =
        async () => {

        try {

            const response =
                await api.get(
                    `/predicciones/participante/${id}`
                );

            setPredicciones(
                response.data
            );

            const jugados =
                response.data.filter(
                    (p: any) =>
                        p.goles_local !== null &&
                        p.goles_visitante !== null
                );

            const pendientes =
                response.data.filter(
                    (p: any) =>
                        p.goles_local === null ||
                        p.goles_visitante === null
                );

            setPartidosJugados(jugados);

            setPartidosPendientes(
                pendientes
            );
            if (
                response.data.length > 0
            ) {
                setNombre(
                    response.data[0] .nombre ||
                    "Participante"
                );
            }

        }
        catch (error) {

            console.error(error);

        }
    };

    return (
        <Layout>

            <div
                className="matches-page"
            >

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
                            "30px"
                    }}
                >
                    {nombre}
                </h3>
                
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        marginTop: "50px"
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
                        marginTop: "30px"
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

            </div>

        </Layout>
    );
};

export default
PrediccionesParticipante;
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api";
import { useNavigate } from 'react-router-dom';
import '../styles/predicciones-finales.css';

interface PrediccionFinal {
    participante: string;
    primer_lugar: string;
    status_primer_lugar: number;
    segundo_lugar: string;
    status_segundo_lugar: number;
    tercer_lugar: string;
    status_tercer_lugar: number;
}

const PrediccionesFinales = () => {
    const navigate = useNavigate();
    const [predicciones, setPredicciones] = useState<PrediccionFinal[]>([]);

    useEffect(() => {
        const cargarPredicciones = async () => {
            try {
                const res = await api.get("/predicciones/finales");
                setPredicciones(res.data);
            } catch (error) {
                console.error("Error cargando predicciones finales", error);
            }
        };
        cargarPredicciones();
    }, []);

    const esPerfecta = (pred: PrediccionFinal) =>
        !!pred.status_primer_lugar && !!pred.status_segundo_lugar && !!pred.status_tercer_lugar;

    return (
        <Layout>
            <div className="predicciones-page d-flex flex-column">
                <div className="predicciones-title">
                    ⚽🏆 Predicciones Países Finalistas 🏆⚽
                </div>
                <div className="predicciones-wrapper">
                    <div className="predicciones-card">
                        <table className="predicciones-table">
                            <thead>
                                <tr>
                                    <th>👤 Participante</th>
                                    <th>🥇 1.er Lugar</th>
                                    <th>🥈 2.do Lugar</th>
                                    <th>🥉 3.er Lugar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {predicciones.map((pred, index) => (
                                    <tr
                                        key={index}
                                        className={
                                            esPerfecta(pred)
                                                ? "pred-fila-perfecta"
                                                : ""
                                        }
                                    >
                                        <td >
                                            <span className="pred-nombre">
                                                {pred.participante}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="pred-equipo">
                                                <span className="pred-equipo-nombre oro">
                                                    {pred.primer_lugar}
                                                </span>
                                                <span
                                                    className={
                                                        !!pred.status_primer_lugar
                                                            ? "emoji-correct"
                                                            : "emoji-incorrect"
                                                    }
                                                    data-tooltip={!!pred.status_primer_lugar ? "Sigue en competencia" : "Eliminado"}
                                                    tabIndex={0}
                                                    style={{ "--i": 1 } as React.CSSProperties}
                                                >
                                                    {!!pred.status_primer_lugar ? "🏅" : "🚫"}
                                                </span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="pred-equipo">
                                                <span className="pred-equipo-nombre plata">
                                                    {pred.segundo_lugar}
                                                </span>
                                                <span
                                                    className={
                                                        !!pred.status_segundo_lugar
                                                            ? "emoji-correct"
                                                            : "emoji-incorrect"
                                                    }
                                                    data-tooltip={!!pred.status_segundo_lugar ? "Sigue en competencia" : "Eliminado"}
                                                    tabIndex={0}
                                                    style={{ "--i": 2 } as React.CSSProperties}
                                                >
                                                    {!!pred.status_segundo_lugar ? "🏅" : "🚫"}
                                                </span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="pred-equipo">
                                                <span className="pred-equipo-nombre bronce">
                                                    {pred.tercer_lugar}
                                                </span>
                                                <span
                                                    className={
                                                        !!pred.status_tercer_lugar
                                                            ? "emoji-correct"
                                                            : "emoji-incorrect"
                                                    }
                                                    data-tooltip={!!pred.status_tercer_lugar ? "Sigue en competencia" : "Eliminado"}
                                                    tabIndex={0}
                                                    style={{ "--i": 3 } as React.CSSProperties}
                                                >
                                                    {!!pred.status_tercer_lugar ? "🏅" : "🚫"}
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="pred-footer">
                    <button className="worldcup-btn" onClick={() => navigate('/')}>
                        ← Regresar 
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default PrediccionesFinales;
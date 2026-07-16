import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api";
import { useNavigate } from 'react-router-dom';
import '../styles/predicciones-finales.css';

interface Pais {
    id: number;
    nombre: string;
    lugar: number | null;
    puede_ser_primero: boolean;
    puede_ser_segundo: boolean;
    puede_ser_tercero: boolean;
}

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
    const [paises, setPaises] = useState<Pais[]>([]);

    const [primerLugar, setPrimerLugar] = useState<number | null>(null);
    const [segundoLugar, setSegundoLugar] = useState<number | null>(null);
    const [tercerLugar, setTercerLugar] = useState<number | null>(null);

    const [podioOriginal, setPodioOriginal] = useState({
        primerLugar: null as number | null,
        segundoLugar: null as number | null,
        tercerLugar: null as number | null
    });

    const usuario = JSON.parse(
        localStorage.getItem("usuario") || "null"
    );

    const esAdmin = usuario?.rol === "admin";

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

        const cargarPaisesPodio = async () => {
            try {
                const res = await api.get("/paises/podio");

                setPaises(res.data);

                // Cargar lo que ya está guardado en la BD
                const primero = res.data.find((p: Pais) => p.lugar === 1);
                const segundo = res.data.find((p: Pais) => p.lugar === 2);
                const tercero = res.data.find((p: Pais) => p.lugar === 3);

                setPrimerLugar(primero ? primero.id : null);
                setSegundoLugar(segundo ? segundo.id : null);
                setTercerLugar(tercero ? tercero.id : null);

                setPodioOriginal({
                    primerLugar: primero?.id ?? null,
                    segundoLugar: segundo?.id ?? null,
                    tercerLugar: tercero?.id ?? null
                });

            } catch (error) {
                console.error("Error cargando países del podio", error);
            }
        };

        cargarPaisesPodio();
    }, []);

    const esPerfecta = (pred: PrediccionFinal) =>
        !!pred.status_primer_lugar && !!pred.status_segundo_lugar && !!pred.status_tercer_lugar;
    
    const guardarPodio = async () => {

        try {

            const datos: any = {};

            if (primerLugar !== podioOriginal.primerLugar) {
                datos.primerLugar = primerLugar;
            }

            if (segundoLugar !== podioOriginal.segundoLugar) {
                datos.segundoLugar = segundoLugar;
            }

            if (tercerLugar !== podioOriginal.tercerLugar) {
                datos.tercerLugar = tercerLugar;
            }

            // Si no hubo cambios, no hace nada
            if (Object.keys(datos).length === 0) {
                alert("No hay cambios para guardar.");
                return;
            }

            await api.put("/paises/podio", datos);

            setPodioOriginal({
                primerLugar,
                segundoLugar,
                tercerLugar
            });

            alert("Podio actualizado");

        } catch (error) {

            console.error("Error guardando podio", error);

        }

    };

    return (
        <Layout>
            <div className="predicciones-page d-flex flex-column">
                <div className="predicciones-title">
                    ⚽🏆 Predicciones Países Finalistas 🏆⚽
                </div>
                <div className="podium">
                    {/* SEGUNDO LUGAR */}
                    <div className="podium-item podium-second">
                        <div className="podium-circle silver">
                            <div className="podium-medal">
                                🥈
                            </div>
                            {esAdmin ? (
                                <select
                                    className="podium-select"
                                    value={segundoLugar ?? ""}
                                    onChange={(e) =>
                                        setSegundoLugar(
                                            e.target.value ? Number(e.target.value) : null
                                        )
                                    }
                                >
                                    <option value="">
                                        Seleccionar
                                    </option>
                                    {
                                        paises
                                        .filter(p => p.puede_ser_segundo)
                                        .map(p => (
                                            <option 
                                                key={p.id}
                                                value={p.id}
                                            >
                                                {p.nombre}
                                            </option>
                                        ))
                                    }
                                </select>
                            ) : (
                                <div className="podium-name">
                                    {
                                        paises.find(
                                            p => p.id === segundoLugar
                                        )?.nombre ?? "Por definir"
                                    }
                                </div>
                            )}
                        </div>
                        <div className="podium-bar">
                            2
                        </div>
                    </div>
                    {/* PRIMER LUGAR */}
                    <div className="podium-item podium-first">
                        <div className="podium-circle gold">
                            <div className="podium-medal">
                                🥇
                            </div>
                            {esAdmin ? (
                                <select
                                    className="podium-select"
                                    value={primerLugar ?? ""}
                                    onChange={(e) =>
                                        setPrimerLugar(
                                            e.target.value ? Number(e.target.value) : null
                                        )
                                    }
                                >
                                    <option value="">
                                        Seleccionar
                                    </option>
                                    {
                                        paises
                                        .filter(p => p.puede_ser_primero)
                                        .map(p => (
                                            <option
                                                key={p.id}
                                                value={p.id}
                                            >
                                                {p.nombre}
                                            </option>
                                        ))
                                    }
                                </select>
                            ) : (
                                <div className="podium-name">
                                    {
                                        paises.find(
                                            p => p.id === primerLugar
                                        )?.nombre ?? "Por definir"
                                    }
                                </div>
                            )}
                        </div>
                        <div className="podium-bar">
                            1
                        </div>
                    </div>
                    {/* TERCER LUGAR */}
                    <div className="podium-item podium-third">
                        <div className="podium-circle bronze">
                            <div className="podium-medal">
                                🥉
                            </div>
                            {esAdmin ? (
                                <select
                                    className="podium-select"
                                    value={tercerLugar ?? ""}
                                    onChange={(e) =>
                                        setTercerLugar(
                                            e.target.value ? Number(e.target.value) : null
                                        )
                                    }
                                >
                                    <option value="">
                                        Seleccionar
                                    </option>
                                    {
                                        paises
                                        .filter(p => p.puede_ser_tercero)
                                        .map(p => (
                                            <option
                                                key={p.id}
                                                value={p.id}
                                            >
                                                {p.nombre}
                                            </option>
                                        ))
                                    }
                                </select>
                            ) : (
                                <div className="podium-name">
                                    {
                                        paises.find(
                                            p => p.id === tercerLugar
                                        )?.nombre ?? "Por definir"
                                    }
                                </div>
                            )}
                        </div>
                        <div className="podium-bar">
                            3
                        </div>
                    </div>
                </div>
                {esAdmin && (
                    <div className="podium-save-container">
                        <button
                            className="podium-save-btn"
                            onClick={guardarPodio}
                        >
                            💾 Guardar
                        </button>
                    </div>
                )}
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
                                                    data-tooltip={!!pred.status_primer_lugar ? "Posible" : "Descartado"}
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
                                                    data-tooltip={!!pred.status_segundo_lugar ? "Posible" : "Descartado"}
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
                                                    data-tooltip={!!pred.status_tercer_lugar ? "Posible" : "Descartado"}
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
import { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import api from "../api"
import '../styles/break.css'

interface Partido {
    id: number;
    equipo_local: string;
    equipo_visitante: string;
    goles_local?: number;
    goles_visitante?: number;
    ganador: string | null;
}

interface Fase {
    id: number;
    nombre: string;
    partidos: Partido[];
}

const svgRef = useRef<SVGSVGElement | null>(null);

const BracketPage = () => {
    const [fases, setFases] = useState<Fase[]>([]);

    useEffect(() => {
        cargarBracket();
    }, []);

    const cargarBracket = async () => {
        try {
            const res = await api.get("/partidos/getBracket");
            setFases(res.data);
        } catch (error) {
            console.error("Error cargando bracket", error);
        }
    };

    const drawLines = () => {
        const svg = svgRef.current;
        if (!svg) return;

        svg.innerHTML = "";

        const matches = document.querySelectorAll(".match");

        matches.forEach((match) => {
            const rect = match.getBoundingClientRect();

            const x1 = rect.right;
            const y1 = rect.top + rect.height / 2;

            const x2 = rect.right + 60;

            const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );

            const d = `
                M ${x1} ${y1}
                H ${x2}
            `;

            path.setAttribute("d", d);
            path.setAttribute("stroke", "#9ca3af");
            path.setAttribute("fill", "none");
            path.setAttribute("stroke-width", "2");

            svg.appendChild(path);
        });
    };

    useEffect(() => {
        setTimeout(() => {
            drawLines();
        }, 500);
    
    }, [fases]);

    return (
        <Layout>
            <div className="bracket-page">
                <h1 className="title">🏟️ Eliminatorias</h1>

                <div className="bracket-wrapper">
                <div className="bracket">
                    {fases
                        .filter((fase) => fase.id !== 1)
                        .map((fase) => (
                            <div key={fase.id} className="round">
                                <h3 className="round-title">{fase.nombre}</h3>

                                <div className="matches">
                                    {fase.partidos.map((p) => (
                                        <div key={p.id} className="match">
                                            <div
                                                className={`team ${
                                                    p.ganador === p.equipo_local ? "winner" : ""
                                                }`}
                                            >
                                                {p.equipo_local}
                                            </div>

                                            <div className="vs">vs</div>

                                            <div
                                                className={`team ${
                                                    p.ganador === p.equipo_visitante ? "winner" : ""
                                                }`}
                                            >
                                                {p.equipo_visitante}
                                            </div>

                                            {p.ganador && (
                                                <div className="winner-tag">
                                                    🏆 {p.ganador}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <svg ref={svgRef} className="bracket-svg"></svg>
        </div>
    </Layout>
  );
};

export default BracketPage;
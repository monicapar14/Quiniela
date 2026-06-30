import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'

const Principal = () => {     

    const navigate = useNavigate();
    
    return (
        <Layout>
            <div className="dashboard-page">
                <div className="dashboard-grid">
                    <div className="tile tile-blue" onClick={() => navigate("/participantes")}>
                        <h1>🏆</h1>
                        <span>Participantes</span>
                    </div>
                    <div className="tile tile-green" onClick={() => navigate("/partidosxDia")}>
                        <h1>📅</h1>
                        <span>Partidos por día</span>
                    </div>
                    <div className="tile tile-orange" onClick={() => navigate("/partidos")}>
                        <h1>⚽</h1>
                        <span>Todos los partidos</span>
                    </div>
                    <div className="tile tile-purple" onClick={() => navigate("/ranking")}>
                        <i className="fa-solid fa-ranking-star"></i>
                        <span>Ranking</span>
                    </div>
                    {/*<div className="tile tile-red" onClick={() => navigate("/bracket")}>
                        <h1>🏟️</h1>
                        <span>Eliminatorias</span>
                    </div>*/}
                </div>
            </div>
        </Layout>        
    )
}

export default Principal
import '../styles/layout.css'
import fondo from '../img/fondoanio.png'
import { Link, useNavigate } from 'react-router-dom'

const Layout = ({ children }: { children: React.ReactNode }) => {

    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

    const logout = () => {
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    return (
        <div className="app-layout">

            {/* NAVBAR */}
            <nav className="app-navbar">
                <div className="container d-flex justify-content-between align-items-center">
                    <span className="brand">
                        ⚽ Quiniela Salguero
                    </span>
                    <span className="subtitle d-flex align-items-center gap-2">
                        <img src={fondo} alt="Mundial" style={{ height: "28px" }} />
                        <span style={{ letterSpacing: "2px" }}>
                            Mundial 2026
                        </span>
                    </span>
                    {usuario ? (
                        <button className="nav-auth-btn" onClick={logout}>
                            <i className="fa-solid fa-right-from-bracket me-1"></i>
                            Log out
                        </button>
                    ) : (
                        <Link to="/login" className="nav-auth-btn">
                            <i className="fa-solid fa-right-to-bracket me-1"></i>
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            {/* CONTENIDO */}
            <main className="app-content">
                {children}
            </main>

            {/* FOOTER */}
            <footer className="app-footer">
                <div className="container text-center">
                    © 2026 Quiniela Mundial ⚽
                </div>
            </footer>

        </div>
    )
}

export default Layout

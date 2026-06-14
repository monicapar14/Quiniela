import '../styles/layout.css'
import fondo from '../img/fondoanio.png'

const Layout = ({ children }: { children: React.ReactNode }) => {
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
                </div>
            </nav>

            {/* CONTENIDO (NO INTERFIERE CON NADA) */}
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
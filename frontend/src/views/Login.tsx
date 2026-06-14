import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import '../styles/login.css'

function Login() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const ingresar = async () => {
        try {
            setLoading(true);

            const { data } = await api.post("/login", {
                nombre,
                password,
            });

            localStorage.setItem("usuario", JSON.stringify(data));

            navigate("/");
        } catch (error) {
            alert("Usuario o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Administrador</h1>

                <input
                    type="text"
                    placeholder="Usuario"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={ingresar} disabled={loading}>
                    {loading ? "Ingresando..." : "Ingresar"}
                </button>
            </div>
        </div>
    );
}

export default Login;
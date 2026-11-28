import { useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { useAuth } from "../context/AuthContext";
import { mensajeDeError } from "../utils/erroresAuth";

//pagina de inicio de sesion: ruta /login
function Login() {
    const { usuario, iniciarSesion } = useAuth();
    const navigate = useNavigate();
    const ubicacion = useLocation();

    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [, setRevalidar] = useState(0);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState("");

    const validador = useRef(
        new SimpleReactValidator({
            messages: {
                required: "Este campo es obligatorio.",
                email: "Ingresa un correo válido (ej. nombre@correo.cl).",
            },
        })
    );

    // si ya hay sesion iniciada va directo al perfil
    if (usuario) {
        return <Navigate to="/perfil" replace />;
    }

    // si el usuario venia de una ruta protegida, se vuelve a ella después de entrar
    const destino = ubicacion.state?.desde || "/perfil";

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validador.current.allValid()) {
            validador.current.showMessages();
            setRevalidar((n) => n + 1);
        return;
        }

        setEnviando(true);
        try {
            await iniciarSesion(correo.trim(), clave);
            navigate(destino, { replace: true });
        } catch (e) {
            console.error(e);
            setError(mensajeDeError(e));
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-5">
                <h1 className="mb-4">Iniciar sesión</h1>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="card shadow-sm">
                    <div className="card-body">
                        <form onSubmit={manejarSubmit} noValidate>
                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo electrónico</label>
                                <input
                                    id="correo"
                                    type="email"
                                    className="form-control"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                                <div className="text-danger small">
                                    {validador.current.message("correo", correo.trim(), "required|email")}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="clave" className="form-label">Contraseña</label>
                                <input
                                    id="clave"
                                    type="password"
                                    className="form-control"
                                    value={clave}
                                    onChange={(e) => setClave(e.target.value)}
                                />
                                <div className="text-danger small">
                                    {validador.current.message("clave", clave, "required")}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-100" disabled={enviando}>
                                {enviando ? "Entrando..." : "Entrar"}
                            </button>
                        </form>
                    </div>
                </div>

                <p className="mt-3 text-center">
                    ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
                </p>
            </div>
        </div>
  );
}

export default Login;
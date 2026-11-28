import { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { useAuth } from "../context/AuthContext";
import { mensajeDeError } from "../utils/erroresAuth";

//pagina de registro: ruta /registro
function Registro() {
    const {usuario, registrar} = useAuth();
    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [, setRevalidar] = useState(0);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState("");

    const validador = useRef(
        new SimpleReactValidator({
            messages: {
                required: "este campo es obligatorio",
                email: "ingrese un correo válido (ej: nombre@correo.com)",
                min: "la contraseña debe tener al menos :min caracteres",
            },
        })
    );

    //si ya tiene sesion iniciada no hay que registrarse
    if (usuario) {
        return <Navigate to="/perfil" replace />;
    }

    //las contraseñas deben coincidir
    const noCoinciden = confirmar !== "" && confirmar !== clave;

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validador.current.allValid() || confirmar === "" || noCoinciden) {
            validador.current.showMessages();
            setRevalidar((n) => n + 1);
            return;
        }

        setEnviando(true);
        try {
            await registrar(correo.trim(), clave);
            navigate("/perfil");
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
                <h1 className="mb-4">Crear cuenta</h1>
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
                                    {validador.current.message("clave", clave, "required|min:6")}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="confirmar" className="form-label">Repetir contraseña</label>
                                <input
                                    id="confirmar"
                                    type="password"
                                    className="form-control"
                                    value={confirmar}
                                    onChange={(e) => setConfirmar(e.target.value)}
                                />
                                <div className="text-danger small">
                                    {noCoinciden && "Las contraseñas no coinciden."}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-100" disabled={enviando}>
                                {enviando ? "Creando cuenta..." : "Registrarme"}
                            </button>
                        </form>
                    </div>
                </div>

                <p className="mt-3 text-center">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
}

export default Registro;
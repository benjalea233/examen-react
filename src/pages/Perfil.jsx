import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// pagina protegida: ruta /perfil solo con sesion iniciada
function Perfil() {
    const { usuario, cerrarSesion } = useAuth();
    const navigate = useNavigate();

    const manejarSalida = async () => {
        await cerrarSesion();
        navigate("/");
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
                <h1 className="mb-4">Mi perfil</h1>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <p className="mb-1 text-muted">Correo</p>
                        <p className="fw-bold">{usuario.email}</p>

                        <p className="mb-1 text-muted">Cuenta creada</p>
                        <p>{new Date(usuario.metadata.creationTime).toLocaleDateString("es-CL")}</p>

                        <button className="btn btn-outline-danger" onClick={manejarSalida}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
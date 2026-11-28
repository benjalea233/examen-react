import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

//si no hay sesión activa, redirige a /login y recuerda a que página quería acceder el usuario
function RutaProtegida({children}) {
    const {usuario, cargando} = useAuth();
    const ubicacion = useLocation();

    //mientras Firebase revisa la sesion
    if (cargando) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (!usuario) {
        return <Navigate to="/login" state={{ desde: ubicacion.pathname }} replace />;
    }

    return children;
}

export default RutaProtegida;
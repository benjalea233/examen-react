import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// navbar agrega automaticamente la clase active al enlace de la ruta actual
//barra de navegacion de Bootstrap
function Navbar() {
    const {usuario, cerrarSesion} = useAuth();
    const navigate = useNavigate();

    const manejarSalida = async () => {
        await cerrarSesion();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    Examen React
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                    aria-controls="menu"
                    aria-expanded="false"
                    aria-label="Abrir menú"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end>
                                Inicio
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/tienda">
                                Tienda
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/formulario">
                                Contacto
                            </NavLink>
                        </li>

                        {/* renderizado condicional según haya sesión o no */}
                        {usuario ? (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/perfil">
                                        Perfil
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light btn-sm ms-md-2" onClick={manejarSalida}>
                                        Salir
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Iniciar sesión
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="btn btn-primary btn-sm ms-md-2" to="/registro">
                                        Registrarse
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
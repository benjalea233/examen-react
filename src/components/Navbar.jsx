import { NavLink } from "react-router-dom";

// navbar agrega automaticamente la clase active al enlace de la ruta actual
function Navbar() {
    return (
        <nav className="nevagacion">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/tienda">Tienda</NavLink>
        </nav>
    );
}

export default Navbar;
import { Link } from "react-router-dom";

// pagina de inicio. ruta sin parámetros
function Inicio() {
    return (
        <div>
            <h1>Examen Final - React</h1>
            <p>Proyecto con componentes, enrutamiento, formularios y Firebase</p>
            <Link to="/tienda">Ir a la tienda </Link>
        </div>
    );
}

export default Inicio;
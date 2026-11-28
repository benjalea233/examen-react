import { Link } from "react-router-dom";

// se muestra cuando cuando la URL no coincide con ninguna ruta
function NoEncontrado() {
    return (
        <div className="alert alert-warning">
            <h1 className="h3">Página no encontrada</h1>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
}

export default NoEncontrado;
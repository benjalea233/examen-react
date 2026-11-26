import { Link } from "react-router-dom";

// se muestra cuando cuando la URL no coincide con ninguna ruta
function NoEncontrado() {
    return (
        <div> 
            <h1>Página no encontrada</h1>
            <Link to = "/">Volver al inicio</Link>
        </div>
    );
}

export default NoEncontrado;
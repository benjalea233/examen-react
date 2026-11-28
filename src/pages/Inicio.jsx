import { Link } from "react-router-dom";

// pagina de inicio. ruta sin parámetros
function Inicio() {
    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <h1 className="display-5 fw-bold">Examen final: React</h1>
            <p className="lead">
                Proyecto con componentes, enrutamiento, formularios y Firebase
            </p>
            <Link className="btn btn-primary btn-lg" to="/tienda">
                Ir a la tienda
            </Link>
        </div>
    );
}

export default Inicio;
import { Link, useNavigate, useParams } from "react-router-dom";
import productos from "../data/productos";


// pagina con parametro: ruta "/producto/:id"
function DetalleProducto() {
    //useParams devuelve los parametros de  la URL
    const {id} = useParams();
    const navigate = useNavigate();

    const producto = productos.find((p) => p.id === Number(id));

    // si el id no coincide con ningun producto, se muestra en pantalla
    if (!producto) {
        return (
            <div className="alert alert-warning">
                <h1 className="h3">Producto no encontrado</h1>
                <Link to="/tienda">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="card shadow-sm">
            <div className="row g-0">
                <div className="col-md-5">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid rounded-start w-100 imagen-detalle"
                    />
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h1 className="card-title h3">{producto.nombre}</h1>
                        <p className="card-text">{producto.descripcion}</p>
                        <p className="fs-4 fw-bold">${producto.precio.toLocaleString("es-CL")}</p>
                        {/* navigate -1 vuelve a la pagina anterior en el historial */}
                        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalleProducto;
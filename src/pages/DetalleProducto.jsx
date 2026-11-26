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
            <div>
                <h1>Producto no encontrado</h1>
                <Link to = "/Tienda">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>{producto.nombre}</h1>
            <img src={producto.imagen} alt={producto.nombre} className="imagen-detalle" />
            <p>{producto.descripcion}</p>
            <p>
                <strong>
                    ${producto.precio.toLocaleString("es-CL")}
                </strong>
            </p>
            {/*Navigate -1 vuelve a la página anterior del historial */}
            <button onClick={() => navigate(-1)}>Volver</button>
        </div>
    );
}

export default DetalleProducto;
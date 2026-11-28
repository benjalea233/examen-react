import { Component } from "react";
import { Link } from "react-router-dom";

//componente de clase hijo: renderiza un producto y su boton
//recibe por props: producto, cantidadEnCArrito y onAgregar (callback del padre)

class Producto extends Component {
    //evento del boton: comunicacion hijo a padre mediante el callback recibido por los props
    manejarClick = () => {
        this.props.onAgregar(this.props.producto);
    };

    render() {
        const { producto, cantidadEnCarrito} = this.props;

        return (
            <div className="card h-100 shadow-sm">
                {/* imagen del producto: alt describe la imagen para accesibilidad */}
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="card-img-top imagen-producto"
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion}</p>
                    <p className="fw-bold">${producto.precio.toLocaleString("es-CL")}</p>
                

                    <div className="mt-auto d-flex gap-2 flex-wrap">
                        <button className="btn btn-primary btn-sm" onClick={this.manejarClick}>
                            Agregar al carrito
                        </button>
                        <Link className="btn btn-outline-secondary btn-sm" to={`/producto/${producto.id}`}>
                            Ver detalle
                        </Link>
                    </div>


                    {/* renderizado condicional: solo se muestra si hay unidades en el carrito */}
                    {cantidadEnCarrito > 0 && (
                        <span className="badge text-bg-success mt-2 align-self-start">
                            {cantidadEnCarrito} en el carrito
                        </span>
                    )}
                </div>
            </div>
        );
    }
}
export default Producto;
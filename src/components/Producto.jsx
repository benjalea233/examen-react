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
            <div className="tarjeta">
                <img src={producto.imagen} alt={producto.nombre} className="imagen-producto" />
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <strong>${producto.precio.toLocaleString("es-CL")}</strong>
                <div>
                    <button onClick={this.manejarClick}>Agregar al Carrito</button>
                        {" "}
                        <Link to={`/producto/${producto.id}`}>Ver detalle</Link>
                </div>
                {/* renderizado condicional: solo se muestra si hay unidades en el carrito */}
                {cantidadEnCarrito > 0 && (
                    <small>{cantidadEnCarrito} en el carrito</small>
                )}
            </div>
        );
    }
}

export default Producto;
import React, { Component } from "react";
import productos from "../data/productos";
import Producto from "./Producto";
import Carrito from "./Carrito";

// componente de clase padre: guarda el estado (productos y carrito)
// y tmbn define los métodos que los hijos invocan mediante callback
class ListaProductos extends Component {
    constructor(props) {
        super(props);
        //esttado inicial
        this.state = {
            productos: [],
            carrito: [],
        };
    }

    // ciclo de vida: se ejecuta una vez cuando el componente ya está en pantalla
    componentDidMount() {
        this.setState({productos: productos});
    }

    // ciclo de vida: se ejecuta después de cada actualizacion de estado
    componentDidUpdate(prevProps, prevState) {
        if (prevState.carrito !== this.state.carrito) {
            const cantidad = this.state.carrito.reduce((s, i) => s + i.cantidad, 0);
            document.title = cantidad > 0 ? `Tienda (${cantidad})` : "Tienda";
        }
    }

    // ciclo de vida: limpieza al desmontar el componente
    componentWillUnmount() {
        document.title = "Tienda";
    }

    // callback que recibe el hijo: agrega una unidad al carrito
    agregarAlCarrito = (producto) => {
        this.setState((estado) => {
            const existente = estado.carrito.find((i) => i.id === producto.id);

            if (existente) {
                // si ya estaba, aumenta la cantidad sin mutar el arreglo original
                return {
                    carrito: estado.carrito.map((i) => 
                        i.id === producto.id ? { ...i, cantidad : i.cantidad + 1 } : i
                    ),
                };
            }
            //si no estaba, se agrega con cantidad 1
            return { carrito: [...estado.carrito, { ...producto, cantidad: 1 }]};
        });
    };

    //quita una unidad / si llega a cero, elimina el producto del carrito
    quitarDelCarrito = (id) => {
        this.setState((estado) => ({
            carrito: estado.carrito
                .map((i) => (i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i))
                .filter((i) => i.cantidad > 0),
        }));
    };

    vaciarCarrito = () => {
        this.setState({carrito: [] });
    };

    render() {
        const { productos, carrito } = this.state;

        return (
            <div className="contenedor-tienda">
                <div className="lista-productos">
                    {/* map(): un componente hijo por cada producto, con su key única */}
                    {productos.map((producto) => {
                        const enCarrito = carrito.find((i) => i.id === producto.id);
                        return (
                            <Producto
                                key={producto.id}
                                producto={producto}
                                cantidadEnCarrito={enCarrito ? enCarrito.cantidad : 0}
                                onAgregar={this.agregarAlCarrito}
                            />
                        );
                    })}
                </div>

                <Carrito
                    items={carrito}
                    onQuitar={this.quitarDelCarrito}
                    onVaciar={this.vaciarCarrito}
                />
            </div>
        );
    }
}

export default ListaProductos;
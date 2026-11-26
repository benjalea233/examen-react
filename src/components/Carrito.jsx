// componente funcional: no tiene estado, solo muestra lo que recibe en props
// los botones llaman al callback del padre

function Carrito({ items, onQuitar, onVaciar }) {
    const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

    if (items.length === 0) {
        return (
            <div className="carrito">
                <h2>Carrito</h2>
                <p>El carrito está vacío</p>
            </div>
        );
    }

    return  (
        <div className="carrito">
            <h2>Carrito</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                         <img src={item.imagen} alt={item.nombre} className="miniatura" />{" "}
                         {item.nombre} x{item.cantidad} — $
                         {(item.precio * item.cantidad).toLocaleString("es-CL")}{" "}
                         <button onClick={() => onQuitar(item.id)}>Quitar uno</button>
                    </li>
                ))}
            </ul>
            <p>
                <strong>Total: ${total.toLocaleString("es-CL")}</strong>
            </p>
            <button onClick={onVaciar}>Vaciar carrito</button>
        </div>
    );
}

export default Carrito;
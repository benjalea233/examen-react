// componente funcional: no tiene estado, solo muestra lo que recibe en props
// los botones llaman al callback del padre

function Carrito({ items, onQuitar, onVaciar }) {
    const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

    return (
        <div className="card shadow-sm">
            <div className="card-header">
                <h2 className="h5 mb-0">Carrito</h2>
            </div>

            {items.length === 0 ? (
                <div className="card-body text-muted">El carrito está vacio</div>
            ) : (
                <>
                    <ul className="list-group list-group-flush">
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item d-flex align-items-center justify-content-between gap-2"
                            >
                                <div className="d-flex align-items-center gap-2">
                                    <img src={item.imagen} alt={item.nombre} className="miniatura" />
                                    <div>
                                        <div>
                                            {item.nombre} x {item.cantidad}
                                        </div>
                                        <small className="text-muted">
                                            ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                                        </small>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => onQuitar(item.id)}
                                >
                                    Quitar uno
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                        <strong>Total: ${total.toLocaleString("es-CL")}</strong>
                        <button className="btn btn-danger btn-sm" onClick={onVaciar}>
                            Vaciar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Carrito;
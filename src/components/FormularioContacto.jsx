import { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";

const estadoInicial = {
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: "",
    terminos: false,
};

// formulario con validaciones: cada campo vive en el estado y se valida con el react-simple-validator
function FormularioContacto({ onEnviar }) {
    const [datos, setDatos] = useState(estadoInicial);
    const [, setRevalidar] = useState(0); // fuerza el re renderzisado para mostrar los errores
    const [enviando, setEnviando] = useState(false);

    //useRef mantiene la misma instancia del validador entre renders
    const validador = useRef(
        new SimpleReactValidator({
            messages: {
                required: "este campo es obligatorio",
                email: "ingrese un correo válido",
                min: "el mensaje debe tener al menos :min caracteres",
                alpha_space: "solo se permiten letras y espacios",
                accepted: "debes aceptar los terminos para continuar",
            },

            validators: {
                // regla personalizada para celular chileno
                telefonoChile: {
                    message: "ingrese un número válido. (ej: +56 9 1234 5678)",
                    rule: (valor) => /^(\+?56)?\s?9\s?\d{4}\s?\d{4}$/.test(valor),
                    required: true,
                },
            },
        })
    )

    // un solo manejador para todos los campos, usa el atributo name del input
    const manejarCambio = (e) => {
        const { name, value, type, checked } = e.target;
        setDatos((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    // muestra el error de un campo al salir de él
    const alSalir = (campo) => () => {
        validador.current.showMessageFor(campo);
        setRevalidar((n) => n + 1);
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();

        if (!validador.current.allValid()) {
            validador.current.showMessages();
            setRevalidar((n) => n + 1);
            return;
        }

        setEnviando(true);
        try {
            await onEnviar({
                nombre: datos.nombre.trim(),
                correo: datos.correo.trim(),
                telefono: datos.telefono.trim(),
                asunto: datos.asunto,
                mensaje: datos.mensaje.trim(),
            });
            setDatos(estadoInicial);
            validador.current.hideMessages();
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form onSubmit={manejarSubmit} noValidate>
            <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input
                id="nombre"
                name="nombre"
                type="text"
                value={datos.nombre}
                onChange={manejarCambio}
                onBlur={alSalir("nombre")}
            />
            <div className="error">
                {validador.current.message("nombre", datos.nombre.trim(), "required|alpha_space")}
            </div>
        </div>

        <div className="campo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
                id="correo"
                name="correo"
                type="email"
                value={datos.correo}
                onChange={manejarCambio}
                onBlur={alSalir("correo")}
            />
            <div className="error">
                {validador.current.message("correo", datos.correo.trim(), "required|email")}
            </div>
        </div>

        <div className="campo">
            <label htmlFor="telefono">Teléfono</label>
            <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="+56 9 1234 5678"
                value={datos.telefono}
                onChange={manejarCambio}
                onBlur={alSalir("telefono")}
            />
            <div className="error">
                {validador.current.message("telefono", datos.telefono.trim(), "required|telefonoChile")}
            </div>
        </div>

        <div className="campo">
            <label htmlFor="asunto">Asunto</label>
            <select
                id="asunto"
                name="asunto"
                value={datos.asunto}
                onChange={manejarCambio}
                onBlur={alSalir("asunto")}
            >
                <option value="">Selecciona una opción</option>
                <option value="Consulta">Consulta</option>
                <option value="Reclamo">Reclamo</option>
                <option value="Sugerencia">Sugerencia</option>
            </select>
            <div className="error">
                {validador.current.message("asunto", datos.asunto, "required")}
            </div>
        </div>

        <div className="campo">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                value={datos.mensaje}
                onChange={manejarCambio}
                onBlur={alSalir("mensaje")}
            />
            <small>{datos.mensaje.trim().length} caracteres (mínimo 10)</small>
            <div className="error">
                {validador.current.message("mensaje", datos.mensaje.trim(), "required|min:10")}
            </div>
        </div>

        <div className="campo">
            <label>
                <input
                    name="terminos"
                    type="checkbox"
                    checked={datos.terminos}
                    onChange={manejarCambio}
                />{" "}
                Acepto los términos y condiciones
            </label>
            <div className="error">
                {validador.current.message("terminos", datos.terminos, "accepted")}
            </div>
        </div>

        <button type="submit" disabled={enviando}>
            {enviando ? "Enviando..." : "Enviar"}
        </button>
        </form>
    );
};

export default FormularioContacto;
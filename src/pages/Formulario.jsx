import { useState } from "react";
import FormularioContacto from "../components/FormularioContacto";

// pagina del Ejercicio 2: ruta /formulario
function Formulario() {
    const [mensajeExito, setMensajeExito] = useState("");

    // esto lo cambio dsps por firestore
    const manejarEnvio = async (datos) => {
        console.log("datos válidos:", datos);
        setMensajeExito("formulario enviado correctamente");
    };

    return (
        <div>
            <h1>Contacto</h1>
            {mensajeExito && <p className="exito">{mensajeExito}</p>}
            <FormularioContacto onEnviar={manejarEnvio} />
        </div>
    );
}

export default Formulario;
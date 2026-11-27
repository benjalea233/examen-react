import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import FormularioContacto from "../components/FormularioContacto";
import { db } from "../firebase";

// pagina del Ejercicio 2: ruta /formulario
function Formulario() {
    const [mensajeExito, setMensajeExito] = useState("");
    const [error, setError] = useState("");

    // guarda el contenido en la collection "contactos" de FIrestore
    const manejarEnvio = async (datos) => {
        setMensajeExito("");
        setError("");
        try {
            await addDoc(collection(db, "contactos"), {
                ...datos,
                creadoEn: serverTimestamp(), //la fecha y hora la asigna el servidor
            });
            setMensajeExito("Formulario guardado y enviado correctamente.");
        } catch (e) {
            console.error(e);
            setError("No se pudo guardar el formulario. Intente nuevamente en un momento.")
        }
    };

    return (
        <div>
            <h1>Contacto</h1>
            {mensajeExito && <p className="exito">{mensajeExito}</p>}
            {error && <p className="error">{error}</p>}
            <FormularioContacto onEnviar={manejarEnvio} />
        </div>
    );
}

export default Formulario;
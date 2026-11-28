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
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
                <h1 className="mb-4">Contacto</h1>
                {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="card shadow-sm">
                    <div className="card-body">
                        <FormularioContacto onEnviar={manejarEnvio} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Formulario;
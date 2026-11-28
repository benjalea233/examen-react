import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext(null);

// proveedor: guarda el usuario actual y las funciones de sesion para el resto de la app
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true); // true mientras Firebase revisa si hay sesion activa

  // ciclo de vida: firebase avisa cada vez que el usuario inicia o cierra sesion
  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual);
      setCargando(false);
    });
    // limpieza al desmontar
    return cancelarSuscripcion;
  }, []);

  const registrar = (correo, clave) => createUserWithEmailAndPassword(auth, correo, clave);
  const iniciarSesion = (correo, clave) => signInWithEmailAndPassword(auth, correo, clave);
  const cerrarSesion = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ usuario, cargando, registrar, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook para usar el contexto desde cualquier otro componente
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
// traduce los codigos de error de firebase Auth a mensajes para el usuario no angloparlante
export function mensajeDeError(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Ya existe una cuenta con este correo.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Correo o contraseña incorrectos.";
    case "auth/weak-password":
      return "La contraseña es muy débil (mínimo 6 caracteres).";
    case "auth/too-many-requests":
      return "Demasiados intentos. Espere un momento e inténtalo más tarde.";
    case "auth/network-request-failed":
      return "Error de conexión.";
    default:
      return "Ocurrió un error inesperado. Intente nuevamente.";
  }
}
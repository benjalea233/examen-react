import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RutaProtegida from "./components/RutaProtegida";
import DetalleProducto from "./pages/DetalleProducto";
import Formulario from "./pages/Formulario";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import NoEncontrado from "./pages/NoEncontrado";
import Perfil from "./pages/Perfil";
import Registro from "./pages/Registro";
import Tienda from "./pages/Tienda";

function App() {
  return (
    <div>
      <Navbar />
      <main className="container pb-5">
        <Routes>
          {/*rutas sin parametros*/}
          <Route path="/" element={<Inicio />} />
          <Route path="/Tienda" element={<Tienda />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />


          {/*rutas con parametros*/}
          <Route path="/producto/:id" element={<DetalleProducto />} />

          {/*ruta comodin*/}
          <Route path="*" element={<NoEncontrado />} />

          {/* ruta protegida: solo con sesión iniciada */}
          <Route
            path="/perfil"
            element={
              <RutaProtegida>
                <Perfil />
              </RutaProtegida>
            }
          />
          
        </Routes>
      </main>
    </div>
  );
}

export default App
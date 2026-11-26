import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import DetalleProducto from "./pages/DetalleProducto";
import Inicio from "./pages/Inicio";
import NoEncontrado from "./pages/NoEncontrado";
import Tienda from "./pages/Tienda";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/*rutas sin parametros*/}
        <Route path="/" element={<Inicio />} />
        <Route path="/Tienda" element={<Tienda />} />

        {/*rutas con parametros*/}
        <Route path="/producto/:id" element={<DetalleProducto />} />

        {/*ruta comodin*/}
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </div>
  );
}

export default App
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/*Hashrouter: funciona en Netifly y Conrdova sin confiugración adicional */}
        <HashRouter>
            <App />
        </HashRouter>
    </StrictMode>
);
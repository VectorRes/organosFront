import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginCliente from "./components/LoginCliente";
import LoginProveedor from "./components/LoginProveedor";
import RegistroCliente from "./components/RegistroCliente";
import RegistroProveedor from "./components/RegistroProveedor";
import ClienteDashboard from "./components/DashboardCliente";
import ProveedorDashboard from "./components/DashboardProveedor";
import Page from "./components/Page";

const App = () => {
  return (
    <Router>
      <Routes>
         {/* Página principal */}
         <Route path="/" element={<Page />} />
        {/* Rutas de Login */}
        <Route path="/cliente/login" element={<LoginCliente />} />
        <Route path="/proveedor/login" element={<LoginProveedor />} />

        {/* Rutas de Registro */}
        <Route path="/cliente/registro" element={<RegistroCliente />} />
        <Route path="/proveedor/registro" element={<RegistroProveedor />} />

        {/* Rutas de Dashboard */}
        <Route path="/cliente/dashboard" element={<ClienteDashboard />} />
        <Route path="/proveedor/dashboard" element={<ProveedorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

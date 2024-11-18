import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  role: "cliente" | "proveedor";
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const tokenKey = role === "cliente" ? "clienteToken" : "proveedorToken";
  const token = localStorage.getItem(tokenKey);

  if (!token) {
    return <Navigate to={`/${role}/login`} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export const LoginCliente = () => {
  const [correoElectronico, setCorreoElectronico] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/cliente/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correoElectronico, contrasena }),
      });
  
      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }
  
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      
      // Guardar el token
      localStorage.setItem("clienteToken", data.user.jwt);
      
      // Guardar los datos del cliente
      const clienteData = {
        nombre: data.user.nombre,
        correo: data.user.correoElectronico,
        pais: data.user.pais || 'No especificado' // Añadir un valor por defecto para el país
      };
      
      console.log("Datos del cliente a guardar:", clienteData);
      localStorage.setItem("clienteData", JSON.stringify(clienteData));
  
      alert("Inicio de sesión exitoso");
      navigate("/cliente/dashboard");
    } catch (error: any) {
      console.error("Error en login:", error);
      alert("Credenciales incorrectas");
    }
  };

  const handleCorreoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCorreoElectronico(e.target.value);
  };

  const handleContrasenaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContrasena(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login Cliente</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={correoElectronico}
              onChange={handleCorreoChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={contrasena}
              onChange={handleContrasenaChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            ¿No tienes cuenta?{" "}
            <button
              onClick={() => navigate("/cliente/registro")}
              className="text-indigo-600 hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCliente;

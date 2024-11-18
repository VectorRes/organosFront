import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  correoElectronico: string;
  contrasena: string;
}

export const LoginProveedor = () => {
  const [formData, setFormData] = useState<FormData>({ correoElectronico: "", contrasena: "" });
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/proveedor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas. Por favor, verifica e intenta nuevamente.");
      }

      const data = await response.json();
      console.log("Inicio de sesión exitoso:", data);

      localStorage.setItem("proveedorToken", data.proveedor.jwt); // Guarda token
      window.location.href = "/proveedor/dashboard"; // Redirigir al dashboard
    } catch (err: any) {
      setError(err.message || "Error desconocido. Intenta más tarde.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Inicio de Sesión Proveedor</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="correoElectronico" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="correoElectronico"
              id="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="contrasena"
              id="contrasena"
              value={formData.contrasena}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">¿No tienes una cuenta?</p>
          <button
            onClick={() => (window.location.href = "/proveedor/registro")}
            className="mt-2 text-blue-500 hover:underline font-medium"
          >
            Crear una cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginProveedor;

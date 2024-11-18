import { useEffect, useState } from "react";

// Definir tipos para los datos del cliente y los órganos
interface Garantia {
  descripcion: string;
  periodoDeValidez: number;
}

interface Proveedor {
  nombre: string;
  correoElectronico: string;
  contacto?: string;
  localizacion?: string;
}

interface Organo {
  id: string;
  tipoOrgano: string;
  procedencia: string;
  precio: number;
  garantia?: Garantia;
  proveedor?: Proveedor;
}

interface Cliente {
  nombre: string;
  correo: string;
  pais: string;
}

const DashboardCliente = () => {
  const [organos, setOrganos] = useState<Organo[]>([]); // Órganos disponibles
  const [cliente, setCliente] = useState<Cliente | null>(null); // Información del cliente
  const [selectedCountry, setSelectedCountry] = useState<string>(""); // País seleccionado por el cliente
  const [availableCountries] = useState<string[]>([
    "Argentina", "Colombia", "México", "España", "Chile", "Perú"
  ]); // Lista de países disponibles
  const [isRelocationMenuVisible, setRelocationMenuVisible] = useState<boolean>(false); // Estado para mostrar el menú de relocalización

  const token = localStorage.getItem("clienteToken");

  useEffect(() => {
    if (!token) {
      window.location.href = "/cliente/login";
      return;
    }

    // Recuperar la información del cliente desde localStorage o API
    const storedClientData = localStorage.getItem("clienteData");
    if (storedClientData) {
      const clientInfo: Cliente = JSON.parse(storedClientData);
      setCliente(clientInfo);
      setSelectedCountry(clientInfo.pais);
    }

    // Obtener los órganos disponibles
    const fetchOrganos = async () => {
      try {
        const response = await fetch("http://localhost:3000/organos-disponibles", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los órganos");
        }

        const data: Organo[] = await response.json();
        setOrganos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrganos();
  }, [token]);

  // Función para manejar el cambio de país
  const handleRelocalizar = () => {
    if (cliente) {
      const updatedClient: Cliente = { ...cliente, pais: selectedCountry };
      setCliente(updatedClient);
      localStorage.setItem("clienteData", JSON.stringify(updatedClient)); // Guardar en localStorage
    }
    setRelocationMenuVisible(false); // Ocultar el menú de relocalización después de cambiar el país
  };

  const handleLogout = () => {
    localStorage.removeItem("clienteToken");
    localStorage.removeItem("clienteData");
    window.location.href = "/cliente/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bienvenido</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar Sesion
        </button>
      </div>

      {cliente && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Detalles del Cliente</h2>
          <p><strong>Nombre:</strong> {cliente.nombre}</p>
          <p><strong>Correo:</strong> {cliente.correo}</p>
          <p><strong>Pais:</strong> {cliente.pais}</p>

          <div className="mt-4">
            <button
              onClick={() => setRelocationMenuVisible(!isRelocationMenuVisible)} // Mostrar u ocultar el menú desplegable
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Solicitar Relocalizacion
            </button>

            {/* Menú de selección de país desplegable */}
            {isRelocationMenuVisible && (
              <div className="mt-4">
                <label htmlFor="country" className="block text-lg font-semibold">Selecciona tu país:</label>
                <select
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="mt-2 p-2 border border-gray-300 rounded"
                >
                  {availableCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Botón para actualizar el país */}
            {isRelocationMenuVisible && (
              <button
                onClick={handleRelocalizar}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Confirmar Relocalizacion
              </button>
            )}
          </div>
        </div>
      )}

      {organos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {organos.map((organo) => (
            <div key={organo.id} className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-bold">Órgano: {organo.tipoOrgano}</h2>
              <p>Procedencia: {organo.procedencia}</p>
              <p>Precio: ${organo.precio}</p>

              {organo.garantia && (
                <>
                  <p className="text-sm text-gray-500">
                    Garantia: {organo.garantia.descripcion}
                  </p>
                  <p className="text-sm text-gray-500">
                    Periodo de Validez: {organo.garantia.periodoDeValidez} meses
                  </p>
                </>
              )}

              {organo.proveedor && (
                <>
                  <p className="text-sm text-gray-500">
                    <strong>Proveedor:</strong> {organo.proveedor.nombre}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Correo:</strong> {organo.proveedor.correoElectronico}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Telefono:</strong> {organo.proveedor.contacto || "No disponible"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Ubicacion:</strong> {organo.proveedor.localizacion || "No disponible"}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No hay órganos disponibles en este momento.</p>
      )}
    </div>
  );
};

export default DashboardCliente;

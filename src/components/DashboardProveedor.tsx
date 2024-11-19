import { useEffect, useState } from "react";

// Definición de los tipos para los estados
interface Organo {
  id: number;
  tipoOrgano: string;
  procedencia: string;
  precio: string;
  garantia?: {
    descripcion: string;
    periodoDeValidez: string;
  };
  proveedor: {
    id: number;
  };
}

interface Garantia {
  descripcion: string;
  periodoDeValidez: string;
}

const DashboardProveedor = () => {
  const [organos, setOrganos] = useState<Organo[]>([]);
  const [newOrgano, setNewOrgano] = useState({
    procedencia: "",
    tipoOrgano: "",
    precio: "",
  });
  const [selectedOrgano, setSelectedOrgano] = useState<number | null>(null);
  const [garantia, setGarantia] = useState<Garantia>({
    descripcion: "",
    periodoDeValidez: "",
  });
  const [error, setError] = useState<string>("");  // Para manejar el mensaje de error
  const token = localStorage.getItem("proveedorToken");

  // Verificación de token antes de usarlo
  if (!token) {
    // Si no hay token, redirigir o mostrar un mensaje de error
    window.location.href = "/proveedor/login";
    return null; // No renderizar el componente si no hay token
  }

  // Cargar órganos disponibles al iniciar
  useEffect(() => {
    const fetchOrganos = async () => {
      try {
        const response = await fetch("https://esperanzaparatodos-czqcsc3f.b4a.run/organos-disponibles", {
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

  // Manejar cambios en los inputs del formulario de órgano
  const handleOrganoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOrgano({ ...newOrgano, [name]: value });
  };

  // Manejar cambios en los inputs del formulario de garantía
  const handleGarantiaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGarantia({ ...garantia, [name]: value });
  };

  // Agregar nuevo órgano
  const handleAddOrgano = async () => {
    try {
      const response = await fetch("https://esperanzaparatodos-czqcsc3f.b4a.run/organos-disponibles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newOrgano),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el órgano");
      }

      const organo: Organo = await response.json();
      setOrganos((prev) => [...prev, organo]);
      setNewOrgano({ procedencia: "", tipoOrgano: "", precio: "" });
    } catch (error) {
      console.error(error);
    }
  };

  // Agregar garantía al órgano seleccionado
  const handleAgregarGarantia = async (idOrgano: number) => {
    try {
      const response = await fetch(`https://esperanzaparatodos-czqcsc3f.b4a.run/organos-disponibles/${idOrgano}/garantia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(garantia),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agregar la garantía");
      }

      // Reiniciar formulario y cerrar modal
      setGarantia({ descripcion: "", periodoDeValidez: "" });
      setSelectedOrgano(null);

      // Actualizar lista de órganos
      const updatedOrganos = await fetch("https://esperanzaparatodos-czqcsc3f.b4a.run/organos-disponibles", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json());

      setOrganos(updatedOrganos);
    } catch (error: any) {
      setError(error.message);  // Mostrar el mensaje de error
      console.error(error);
    }
  };

  // Eliminar órgano
  const handleDeleteOrgano = async (idOrgano: number) => {
    try {
      const response = await fetch(`https://esperanzaparatodos-czqcsc3f.b4a.run/organos-disponibles/${idOrgano}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          alert("No tienes permiso para eliminar este órgano.");
        } else {
          throw new Error("Error al eliminar el órgano");
        }
        return;
      }

      // Actualizar lista de órganos
      setOrganos((prev) => prev.filter((organo) => organo.id !== idOrgano));
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al intentar eliminar el órgano.");
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("proveedorToken");
    window.location.href = "/proveedor/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard del Proveedor</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar Sesion
        </button>
      </div>

      {/* Mostrar mensaje de error si existe */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Formulario para agregar órganos */}
      <div className="p-4 bg-white rounded shadow mb-6">
        <h2 className="text-lg font-bold mb-4">Agregar Nuevo organo</h2>
        <div className="space-y-2">
          <input
            type="text"
            name="procedencia"
            placeholder="Procedencia"
            value={newOrgano.procedencia}
            onChange={handleOrganoChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="tipoOrgano"
            placeholder="Tipo de Órgano"
            value={newOrgano.tipoOrgano}
            onChange={handleOrganoChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="precio"
            placeholder="Precio"
            value={newOrgano.precio}
            onChange={handleOrganoChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={handleAddOrgano}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar organo
        </button>
      </div>

      {/* Lista de órganos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organos.map((organo) => (
          <div key={organo.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold">{organo.tipoOrgano}</h2>
            <p>Procedencia: {organo.procedencia}</p>
            <p>Precio: ${organo.precio}</p>
            {organo.garantia ? (
              <p className="text-sm text-gray-500">
                Garantia: {organo.garantia.descripcion} - {organo.garantia.periodoDeValidez} meses
              </p>
            ) : (
              // Solo mostrar botón para agregar garantía si el órgano pertenece al proveedor autenticado
              organo.proveedor.id === JSON.parse(atob(token.split('.')[1])).id && (
                <button
                  onClick={() => setSelectedOrgano(organo.id)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Agregar Garantia
                </button>
              )
            )}
            <button
              onClick={() => handleDeleteOrgano(organo.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Formulario de garantía */}
      {selectedOrgano && (
        <div className="p-4 bg-white rounded shadow mt-6">
          <h2 className="text-lg font-bold">Agregar Garantía</h2>
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={garantia.descripcion}
            onChange={handleGarantiaChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="number"
            name="periodoDeValidez"
            placeholder="Periodo de Validez (meses)"
            value={garantia.periodoDeValidez}
            onChange={handleGarantiaChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <div className="flex justify-end">
            <button
              onClick={() => setSelectedOrgano(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleAgregarGarantia(selectedOrgano)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProveedor;

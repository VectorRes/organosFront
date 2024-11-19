import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';

// Definir la estructura de los datos del formulario
interface FormData {
  nombre: string;
  contacto: string;
  localizacion: string;
  correoElectronico: string;
  contrasena: string;
}

const RegistroProveedor = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    contacto: '',
    localizacion: '',
    correoElectronico: '',
    contrasena: '',
  });

  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Hook para redirigir

  // Manejar los cambios en los campos del formulario
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://esperanzaparatodos-czqcsc3f.b4a.run/proveedor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error en el registro');
        return;
      }

      // Redirigir al login del proveedor después del registro exitoso
      navigate('/proveedor/login');
    } catch (err) {
      setError('Hubo un problema con el servidor. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border border-gray-300 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registro Proveedor</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        placeholder="Nombre"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="contacto"
        value={formData.contacto}
        onChange={handleInputChange}
        placeholder="Contacto"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="localizacion"
        value={formData.localizacion}
        onChange={handleInputChange}
        placeholder="Localización"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="email"
        name="correoElectronico"
        value={formData.correoElectronico}
        onChange={handleInputChange}
        placeholder="Correo Electrónico"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="password"
        name="contrasena"
        value={formData.contrasena}
        onChange={handleInputChange}
        placeholder="Contraseña"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Registrar
      </button>
    </form>
  );
};

export default RegistroProveedor;

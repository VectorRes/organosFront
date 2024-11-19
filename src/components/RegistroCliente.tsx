import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';

// Definir la estructura de los datos del formulario
interface FormData {
  nombre: string;
  documento: string;  // Usamos string porque el valor es un texto en el formulario (aunque se convertirá en número)
  tipoDocumento: string;
  correoElectronico: string;
  contrasena: string;
  fechaNacimiento: string;
  pais: string;
}

const RegistroCliente = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    documento: '',
    tipoDocumento: '',
    correoElectronico: '',
    contrasena: '',
    fechaNacimiento: '',
    pais: '',
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
    // Convertir 'documento' a un número entero
    const updatedFormData = { 
      ...formData, 
      documento: parseInt(formData.documento, 10) 
    };

    try {
      const response = await fetch('https://esperanzaparatodos-czqcsc3f.b4a.run/cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error en el registro');
        return;
      }

      // Redirigir al login del cliente después del registro exitoso
      navigate('/cliente/login');
    } catch (err) {
      setError('Hubo un problema con el servidor. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border border-gray-300 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registro Cliente</h2>
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
        type="number"
        name="documento"
        value={formData.documento}
        onChange={handleInputChange}
        placeholder="Documento"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="tipoDocumento"
        value={formData.tipoDocumento}
        onChange={handleInputChange}
        placeholder="Tipo de Documento"
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
      <input
        type="date"
        name="fechaNacimiento"
        value={formData.fechaNacimiento}
        onChange={handleInputChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="pais"
        value={formData.pais}
        onChange={handleInputChange}
        placeholder="País"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Registrar
      </button>
    </form>
  );
};

export default RegistroCliente;

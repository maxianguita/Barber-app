import React, { useState } from 'react';
import axios from 'axios';

const CrearUsuarioModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'success' o 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(''), 3000); // Limpiar el mensaje después de 3 segundos
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/api/usuarios', formData);
      if (res.status === 201) {
        mostrarMensaje('Usuario creado con éxito', 'success');
        onClose(); // Cerrar el modal después de la creación
      }
    } catch (err) {
      console.error(err);
      mostrarMensaje('Error al crear usuario', 'error');
    }
  };

  return (
    <div>
      {/* Toast notification */}
      {mensaje && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg w-80 ${
            tipoMensaje === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {mensaje}
        </div>
      )}

      {/* Modal content */}
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-600 text-2xl font-bold hover:text-red-500"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Crear Usuario</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2"
            />
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Seleccioná un rol</option>
              <option value="admin">Admin</option>
              <option value="barbero">Barbero</option>
            </select>

            <button
              type="submit"
              className="bg-indigo-700 text-white font-bold py-2 rounded hover:bg-indigo-700 transition"
            >
              Crear Usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearUsuarioModal;

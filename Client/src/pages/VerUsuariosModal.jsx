import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerUsuariosModal = ({ onClose }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [confirmarId, setConfirmarId] = useState(null);


  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token que se está enviando:', token);
        if (!token) throw new Error('No hay token de autenticación');

       const res = await axios.get(`${API_URL}/api/usuarios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsuarios(res.data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        mostrarMensaje('Error al cargar usuarios', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(''), 3000);
  };

  const eliminarUsuario = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/usuarios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsuarios((prev) => prev.filter((user) => user.id !== id));
      mostrarMensaje('Usuario eliminado correctamente', 'success');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      mostrarMensaje('Error al eliminar el usuario', 'error');
    } finally {
      setConfirmarId(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative p-6 sm:p-8 overflow-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-gray-800">
          Usuarios Registrados
        </h2>

        {mensaje && (
          <div
            className={`mb-4 text-center px-4 py-2 rounded text-sm font-medium ${
              tipoMensaje === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {mensaje}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Cargando usuarios...</p>
        ) : usuarios.length === 0 ? (
          <p className="text-center text-gray-500">No hay usuarios registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200 rounded">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="p-2 border">Nombre</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Rol</th>
                  <th className="p-2 border text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{user.nombre}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.rol}</td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => setConfirmarId(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal de confirmación */}
        {confirmarId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-semibold text-center mb-3">¿Eliminar usuario?</h3>
              <p className="text-sm text-gray-600 text-center mb-5">
                Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setConfirmarId(null)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => eliminarUsuario(confirmarId)}
                  className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerUsuariosModal;

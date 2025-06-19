import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { useAuth } from '../context/AuthContext';

const ModalRegister = ({ onClose, onRegisterSuccess }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/usuarios', {
        nombre,
        email,
        password,
        rol: 'cliente',
      });

      const { token, usuario } = res.data;

      // Usamos la función login del contexto para actualizar estado y localStorage
      login({ userData: usuario, token });

      if (typeof onRegisterSuccess === 'function') {
        onRegisterSuccess(usuario);
      }

      toast.success('✅ Registro exitoso');

      setTimeout(() => {
        if (typeof onClose === 'function') {
          onClose();
        }
      }, 1500);

    } catch (err) {
      console.error(err);
      toast.error('❌ Error al registrar. Intenta con otro correo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-6 z-50 relative"
        >
          <button
            onClick={onClose}
            type="button"
            className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
          <h2 className="text-2xl font-semibold text-center text-gray-800">Crear cuenta</h2>

          <div>
            <label htmlFor="nombre" className="block text-sm text-gray-600 mb-1">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600 mb-1">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black hover:bg-gray-700 text-white font-medium py-2.5 rounded-xl transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Registrando...' : 'Registrarme'}
          </button>
        </form>
      </div>

      <Toaster position="top-center" richColors />
    </>
  );
};

export default ModalRegister;

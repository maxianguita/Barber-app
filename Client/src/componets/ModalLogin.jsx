import axios from "axios";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import { useAuth } from '../context/AuthContext';

const ModalLogin = ({ onClose }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('⚠️ Por favor, completá todos los campos');
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:3001/api/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // 💡 Corregido: usamos `usuario` como viene del backend
      const { token, usuario } = res.data;

      if (token && usuario) {
        login({ userData: usuario, token });
        toast.success('✅ Inicio de sesión exitoso');

        setTimeout(() => {
          if (typeof onClose === 'function') {
            onClose();
          }
        }, 1500);
      } else {
        toast.error('❌ Respuesta inválida del servidor');
      }
    } catch (err) {
      console.error("Error de login:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || '❌ Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Iniciar sesión</h2>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
            Correo electrónico
          </label>
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
          <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
            Contraseña
          </label>
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
          disabled={isLoading}
          className={`w-full ${
            isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-700'
          } text-white font-medium py-2.5 rounded-xl transition`}
        >
          {isLoading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>

      <Toaster position="top-center" richColors />
    </>
  );
};

export default ModalLogin;

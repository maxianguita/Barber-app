import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import fondo from '../assets/barber_files/fondo4.jpg';
import login from '../assets/barber_files/login.png'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_URL;
  console.log("🔗 API_URL en Login:", API_URL);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('📤 Enviando login con:', { email, password });

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      // console.log('✅ Respuesta del servidor:', res.data);

      const { token, user } = res.data;

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // console.log('🔐 Token guardado en localStorage:', token);
        // console.log('👤 Usuario guardado en localStorage:', user);

        navigate('/paneladmin');
        // console.log('➡️ Navegando a /paneladmin');
      } else {
        console.warn('⚠️ Respuesta inválida del servidor:', res.data);
        alert('Respuesta inválida del servidor');
      }

    } catch (error) {
      console.error('❌ Error en login:', error.response?.data || error.message);
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center bg-gray-100 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-6 p-10 bg-white bg-opacity-90 rounded-xl shadow-lg w-full max-w-sm"
        style={{ minHeight: '500px' }}
      >
        <div className="flex justify-center mb-4">
          <img src={login} alt="Logo" className="h-16 w-auto max-w-[120px]" />
        </div>

        <h2 className="text-center text-2xl font-semibold mb-4">Iniciar sesión (Admin)</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="p-3 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Ingresar
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-2 p-2 text-sm text-blue-600 underline hover:text-blue-800"
        >
          ¿Sos cliente? Ingresá aquí
        </button>
      </form>
    </div>
  );
};

export default Login;

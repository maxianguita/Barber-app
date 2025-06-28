// Cambio mínimo para forzar deploy en Vercel - 2025-06-21
import axios from 'axios';

// URL base del backend desde variable de entorno o por defecto
//const API = 'http://localhost:3001/api';
const API = `${import.meta.env.VITE_API_URL.trim()}/api`;

console.log("Valor de VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("URL completa del API:", API);

// Función para hacer login
export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    return res.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error.response?.data || { message: "Error al conectar con el servidor" };
  }
};

// Obtener el token guardado en localStorage
export const getToken = () => localStorage.getItem('token');

// Cerrar sesión (eliminar token y usuario del localStorage)
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

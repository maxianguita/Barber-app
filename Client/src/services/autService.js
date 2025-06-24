import axios from 'axios';

// URL base del backend desde variable de entorno o por defecto
//const API = 'http://localhost:3001/api';
const API = `${process.env.REACT_APP_API_URL}/api`;




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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModalUser = ({ onClose }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/usuarios', {
        nombre,
        email,
        password,
        rol: 'user'
      });

      alert('✅ Usuario registrado con éxito');
      navigate('/loginuser');
      onClose();
    } catch (err) {
      console.error(err);
      setError('Error al registrar. Intenta con otro correo.');
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-white p-8 rounded shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="w-full p-3 mb-4 border rounded"
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 mb-4 border rounded"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-3 mb-4 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-500"
      >
        Registrarse
      </button>

      <p className="mt-4 text-center text-sm">
        ¿Ya tenés cuenta?{' '}
        <span
          className="text-blue-600 cursor-pointer underline"
          onClick={() => {
            navigate('/loginuser');
            onClose();
          }}
        >
          Iniciar sesión
        </span>
      </p>
    </form>
  );
};

const ModalRegister = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded shadow-md w-full max-w-sm">
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-800"
        >
          ×
        </button>
        <RegisterUser onClose={handleClose} />
      </div>
    </div>
  );
};

export default ModalUser;

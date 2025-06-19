import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

import CrearUsuarioModal from './CrearUsuarioModall';
import VerUsuariosModal from './VerUsuariosModal';
import TurnosModal from './TurnosModal';
import GestionarProfesionalesModal from './ProfesionalesModal';

const PanelAdmin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalUsuarios, setMostrarModalUsuarios] = useState(false);
  const [mostrarTurnosModal, setMostrarTurnosModal] = useState(false);
  const [mostrarGestionProfesionalesModal, setMostrarGestionProfesionalesModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const acciones = [
    {
      titulo: 'Crear nuevo usuario',
      descripcion: 'Agregá administradores o empleados al sistema.',
      icono: '👤',
      onClick: () => setMostrarModal(true),
    },
    {
      titulo: 'Ver usuarios registrados',
      descripcion: 'Lista de todas las cuentas creadas.',
      icono: '📋',
      onClick: () => setMostrarModalUsuarios(true),
    },
    {
      titulo: 'Gestionar profesionales',
      descripcion: 'Agregar, editar o eliminar barberos.',
      icono: '✂️',
      onClick: () => setMostrarGestionProfesionalesModal(true),
    },
    {
      titulo: 'Turnos',
      descripcion: 'Crear y administrar reservas.',
      icono: '📅',
      onClick: () => setMostrarTurnosModal(true),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-black flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-gray-800 rounded-2xl shadow-2xl p-10 text-white relative">

        <button
          onClick={() => navigate('/')}
          className="absolute left-6 top-6 text-white hover:text-sky-400 transition text-2xl"
        >
          ← Home
        </button>

        <header className="mb-8 border-b border-gray-600 pb-4">
          <h1 className="text-4xl font-bold text-center text-cyan-400">Panel de Administración</h1>
          <p className="mt-1 text-gray-300 font-semibold text-center">Gestión interna de la barbería</p>
        </header>

        {user ? (
          <>
            <div className="text-center mb-10">
              <p className="text-xl font-bold">
                Bienvenido, <span className="text-sky-400 font-bold">{user.name}</span> 👋
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {acciones.map((accion, index) => (
                <div
                  key={index}
                  onClick={accion.onClick}
                  className="cursor-pointer bg-gray-700 hover:bg-sky-700 transition-all duration-200 p-6 rounded-xl shadow-lg"
                >
                  <div className="text-3xl mb-2">{accion.icono}</div>
                  <h2 className="text-xl font-bold mb-1">{accion.titulo}</h2>
                  <p className="text-gray-300 text-sm">{accion.descripcion}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-300 font-semibold">Cargando información del usuario...</p>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 shadow-md"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {mostrarModal && <CrearUsuarioModal onClose={() => setMostrarModal(false)} />}
      {mostrarModalUsuarios && <VerUsuariosModal onClose={() => setMostrarModalUsuarios(false)} />}
      {mostrarTurnosModal && <TurnosModal onClose={() => setMostrarTurnosModal(false)} />}
      {mostrarGestionProfesionalesModal && <GestionarProfesionalesModal onClose={() => setMostrarGestionProfesionalesModal(false)} />}
    </div>
  );
};

export default PanelAdmin;
